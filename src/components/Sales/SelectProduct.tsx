import { PlusCircle } from "@phosphor-icons/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCallback, useEffect, useState } from "react";

import { useFetch } from "@/hooks/useFetch";
import { Card } from "../ui/Card";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { SelectedProducts } from "@/pages/sales/create";
import { NumberFormat } from "@/hooks/useNumberFormat";
import { MoneyFormat } from "@/hooks/useMoneyFormat";
import { toast } from "react-toastify";

type Inventory = {
  id: number
  name: string
  amount: number
  unitaryValue: string;
  totalValue: string;
}

type SelectProductProps = {
  setSelectedProducts: (data: SelectedProducts) => void;
}

export function SelectProduct({ setSelectedProducts }: SelectProductProps) {
  const { data: products } = useFetch<Inventory[]>("/inventory");
  const { register, handleSubmit, formState, setValue, setError, getValues, watch, reset } = useForm<SelectedProducts>({
    defaultValues: {
      amount: 1,
      uniValue: "0,00",
      totalValue: "0,00"
    }
  });
  const [maxAmount, setMaxAmount] = useState<number>(0);
  const watchAmount = watch("amount");

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
      if (maxAmount != 0 && watchAmount > maxAmount) {
        toast.error(`A quantidade informada é maior que a disponível no estoque (${maxAmount})`);
      }
      selectProduct(getValues("productId"));
    }
  }, [getValues, selectProduct, maxAmount, setError, watchAmount]);

  const handleSelectProduct: SubmitHandler<SelectedProducts> = (data) => {
    setSelectedProducts(data);
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
      <div className="flex flex-col md:grid md:grid-cols-12 md:items-end gap-4 p-4">
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
          className="mt-auto mx-auto md:col-span-1"
          ariaLabel="Botão que adiciona produtos na tabela"
          icon={<PlusCircle size={24} />}
          variant="secondary"
        />
      </div>
    </Card>
  );
}