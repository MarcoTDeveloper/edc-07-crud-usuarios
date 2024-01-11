import { PlusCircle } from "@phosphor-icons/react";
import { FieldArrayWithId, SubmitHandler, UseFieldArrayAppend, useForm } from "react-hook-form";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { useFetch } from "@/hooks/useFetch";
import { Card } from "../ui/Card";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { CreateSaleFormData, SelectedProducts } from "@/pages/sales/create";
import { NumberFormat } from "@/hooks/useNumberFormat";
import { MoneyFormat } from "@/hooks/useMoneyFormat";

type Inventory = {
  id: number
  name: string
  amount: number
  unitaryValue: string;
  totalValue: string;
}

type SelectProductProps = {
  productsFields: FieldArrayWithId<CreateSaleFormData, "products", "id">[]
  append: UseFieldArrayAppend<CreateSaleFormData, "products">;
}

export function SelectProduct({ productsFields, append }: SelectProductProps) {
  const { data: products } = useFetch<Inventory[]>("/inventory");
  const { register, handleSubmit, formState, setValue, setError, getValues, watch, reset } = useForm<SelectedProducts>({
    defaultValues: {
      amount: 1,
      uniValue: "0,00",
      totalValue: "0,00"
    }
  });
  const [maxAmount, setMaxAmount] = useState<number>(0);
  const watchAmount = Number(watch("amount"));

  const selectProduct = useCallback((productId: number) => {
    const selectedProduct = products?.find(product => product.id == productId);
    if (selectedProduct) {
      const unitaryValue = NumberFormat(selectedProduct.unitaryValue);
      const totalValue = unitaryValue * getValues("amount");
      setMaxAmount(selectedProduct.amount);
      setValue("productId", productId);
      setValue("uniValue", selectedProduct.unitaryValue);
      setValue("totalValue", MoneyFormat(totalValue).replace("R$", ""));
    }
  }, [getValues, products, setValue]);

  useEffect(() => {
    if (getValues("productId") != 0 && watchAmount > 0) {
      let selectedAmount = Number(productsFields.length > 0 ? productsFields.find(product => product.productId == getValues("productId"))?.amount || 0 : 0);
      console.table([selectedAmount, maxAmount, watchAmount]);
      if (maxAmount != 0 && (watchAmount + selectedAmount) > maxAmount) {
        toast.error(`A quantidade informada é maior que a disponível no estoque (${maxAmount})`);
      }
      selectProduct(getValues("productId"));
    }
  }, [getValues, selectProduct, maxAmount, setError, watchAmount, productsFields]);

  const handleSelectProduct: SubmitHandler<SelectedProducts> = (data) => {
    let selectedAmount = Number(productsFields.length > 0 ? productsFields.find(product => product.productId == data.productId)?.amount || 0 : 0);
    if (maxAmount != 0 && (watchAmount + selectedAmount) > maxAmount) {
      toast.error("Quantidade indisponível ou maior que a do estoque atual!");
      return;
    }

    append(data);
    reset({
      amount: 1,
      productId: 0,
      description: "",
      totalValue: "0,00",
      uniValue: "0,00"
    });
  };

  return (
    <Card title="Produto">
      <div className="flex flex-col md:grid md:grid-cols-12 md:items-baseline gap-4 p-4">
        <Input
          id="productAmount"
          type="number"
          label="Quant."
          className="md:col-span-1"
          {...register("amount", {
            required: "Campo Obrigatório"
          })}
          error={formState.errors.amount?.message}
          required
        />
        <Input
          id="productDescription"
          type="text"
          label="Descrição"
          className="md:col-span-6"
          {...register("description", {
            required: "Campo Obrigatório",
            onChange: (event) => {
              const id = event.target.value.split(" - ")[0];
              if (id != "") {
                selectProduct(id);
              } else {
                setValue("productId", 0);
                setValue("amount", 1);
                setValue("uniValue", "0,00");
                setValue("totalValue", "0,00");
              }
            }
          })}
          error={formState.errors.description?.message}
          required
          list="inventoryList"
        />
        <datalist id="inventoryList">
          {products?.map(product => (
            <option key={product.id} value={`${product.id} - ${product.name}`} />
          ))}
        </datalist>
        <Input
          id="productUnitValue"
          type="text"
          label="Valor Uni. (R$)"
          className="md:col-span-2"
          {...register("uniValue")}
          disabled
        />
        <Input
          id="productTotalValue"
          type="text"
          label="Valor Total (R$)"
          className="md:col-span-2"
          {...register("totalValue")}
          disabled
        />
        <Button
          onClick={handleSubmit(handleSelectProduct)}
          type="button"
          className="flex items-center justify-center line w-14 mx-auto mt-auto md:col-span-1"
          ariaLabel="Botão que adiciona produtos na tabela"
          icon={<PlusCircle size={24} />}
          variant="secondary"
        />
      </div>
    </Card>
  );
}