import { Form } from "antd";
import { FC } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

type TFormConfig = {
  defaultValues?: Record<string, unknown>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  resolver?: any;
};

type IPHFormProps = {
  onSubmit: SubmitHandler<FieldValues>;
  children: React.ReactNode;
} & TFormConfig;

const PHForm: FC<IPHFormProps> = ({
  onSubmit,
  children,
  defaultValues,
  resolver,
}) => {
  const formConfig: TFormConfig = {};

  if (defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }

  if (resolver) {
    formConfig["resolver"] = resolver;
  }

  const methods = useForm(formConfig);

  return (
    <FormProvider {...methods}>
      <Form layout="vertical" onFinish={methods.handleSubmit(onSubmit)}>
        {children}
      </Form>
    </FormProvider>
  );
};

export default PHForm;
