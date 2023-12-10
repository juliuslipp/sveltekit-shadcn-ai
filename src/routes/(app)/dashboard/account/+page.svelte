<script lang="ts">
  import { Heading, Shell } from "$lib/components/layout";
  import { Card } from "$lib/components/ui/card";
  import {
    Form,
    FormButton,
    FormDescription,
    FormField,
    FormInput,
    FormItem,
    FormLabel,
    FormValidation,
  } from "$lib/components/ui/form";
  import { accountFormSchema } from "$lib/schemas/account-schema";
  import { toast } from "svelte-sonner";

  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<Shell as="section">
  <Heading
    title="Account"
    description="Manage your account settings."
    size="sm"
  />

  <Card class="flex-1 p-4 lg:max-w-2xl">
    <Form
      method="POST"
      class="space-y-8"
      let:config
      let:submitting
      let:tainted
      schema={accountFormSchema}
      form={data.form}
      options={{
        onResult: ({ result }) => {
          if (result?.type === "success") {
            toast.success("Account updated successfully");
          }
        },
        onError: () => {
          toast.error("Something went wrong. Please try again.");
        },
      }}
    >
      <FormItem>
        <FormField name="name" {config}>
          <FormLabel>Name</FormLabel>
          <FormInput placeholder="Your name" />
          <FormDescription>
            This is the name that will be displayed on your profile and in
            emails.
          </FormDescription>
          <FormValidation />
        </FormField>
      </FormItem>

      <FormButton disabled={!tainted} loading={submitting}
        >Update account</FormButton
      >
    </Form>
  </Card>
</Shell>
