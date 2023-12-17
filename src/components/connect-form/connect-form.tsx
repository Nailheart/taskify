import { FC, ReactNode } from "react";
import { useFormContext, UseFormReturn } from "react-hook-form";

type Props = {
  children: (methods: UseFormReturn) => ReactNode;
};

/**
 * Note: Does not work without FormProvider from react-hook-form
 *
 * @see https://www.react-hook-form.com/advanced-usage/#ConnectForm
 */

const ConnectForm: FC<Props> = ({ children }) => {
  const methods = useFormContext();

  return children({ ...methods });
};

export { ConnectForm };
