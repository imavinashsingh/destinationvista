import * as React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  required,
  email,
  useUnique,
} from "react-admin";
import { SelectInput } from "react-admin";

export const UserCreate = () => {
  const unique = useUnique();
  return (
    <Create>
      <SimpleForm>
        <SelectInput
          source="category"
          validate={[required()]}
          choices={[
            { id: "0", name: "Super Admin" },
            { id: "1", name: "Subscriber" },
            { id: "2", name: "User" },
          ]}
        />
        <TextInput source="firstName" validate={[required()]} />
        <TextInput source="lastName" validate={[required()]} />
        <TextInput source="email" validate={[required(), email(), unique()]} />
        <TextInput source="password" validate={[required()]} />
        <TextInput source="referCode" validate={[required()]} />
        <TextInput source="createdBy" validate={[required()]} />
        <TextInput source="updatedBy" validate={[required()]} />
      </SimpleForm>
    </Create>
  );
};
