import { FC, InputHTMLAttributes } from "react";

import { ConnectForm } from "@/components/connect-form/connect-form";
import { Input } from "@/components/ui/input";

type Props = {
  name: string;
};

type InputProps = Props &
  Omit<InputHTMLAttributes<HTMLInputElement>, keyof Props>;

const InputForm: FC<InputProps> = ({ name, ...rest }) => {
  return (
    <ConnectForm>
      {({ register, formState: { errors } }) => {
        const message = errors[name]?.message?.toString();

        return (
          <div>
            <Input {...register(name)} {...rest} />
            {message && (
              <p className="text-sm font-medium text-destructive">{message}</p>
            )}
          </div>
        );
      }}
    </ConnectForm>
  );
};

export { InputForm };
