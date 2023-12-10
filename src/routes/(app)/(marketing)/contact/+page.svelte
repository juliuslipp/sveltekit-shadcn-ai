<script lang="ts">
  import ExternalLink from "$lib/components/external-link.svelte";
  import { Icons } from "$lib/components/icons";
  import { Container, Shell } from "$lib/components/layout";
  import { Card } from "$lib/components/ui/card";
  import {
    Form,
    FormButton,
    FormField,
    FormInput,
    FormItem,
    FormLabel,
    FormTextarea,
    FormValidation,
  } from "$lib/components/ui/form";
  import { siteConfig } from "$lib/config/site";
  import { accountFormSchema } from "$lib/schemas/account-schema";
  import { toast } from "svelte-sonner";

  import type { PageData } from "./$types";

  export let data: PageData;

  let send: boolean = false;
</script>

<Shell variant="container" as="div">
  <Container variant="main" class="grid grid-cols-1 gap-6 md:grid-cols-2">
    <div class="relative">
      <h2
        class="font-heading my-auto flex text-3xl leading-[1.1] sm:text-3xl md:text-6xl"
      >
        Get in touch.
      </h2>
      <p class="mb-6 text-lg w-3/4">
        We are here to help you with any questions you may have. Please fill out
        the form, join our discord, or send us an email! We will get back to you
        as soon as possible.
      </p>

      <div class="col-span-full grid grid-cols-1 gap-2">
        <a
          class="col-span-full mr-auto flex"
          href={`mailto:${siteConfig.email}`}
        >
          <Icons.mail class="w-6 h-6 mr-2" />
          {siteConfig.email}
        </a>

        <ExternalLink
          href={siteConfig.links.discord}
          class="col-span-full mr-auto flex"
        >
          <Icons.discord class="w-6 h-6"></Icons.discord>
          Join the community!
        </ExternalLink>

        <ExternalLink
          class="col-span-full mr-auto flex"
          href={siteConfig.links.twitter}
        >
          <Icons.twitter class="w-6 h-6"></Icons.twitter>
          Read up!
        </ExternalLink>
      </div>
    </div>

    <div class="pb-8 md:pt-12 lg:pt-16 w-full">
      {#if send}
        <div>
          <h4 class="text-xl">Thank you!</h4>
          <p>
            We have received your message and will get back to you as soon as
            possible.
          </p>
        </div>
      {:else}
        <Card class="p-4 md:p-8 min-w-full">
          <Form
            method="POST"
            class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
            let:config
            let:submitting
            let:tainted
            schema={accountFormSchema}
            form={data.form}
            options={{
              onResult: ({ result }) => {
                if (result?.type === "success") {
                  send = true;
                }
              },
              onError: () => {
                toast.error("Something went wrong. Please try again.");
              },
            }}
          >
            <FormItem>
              <FormField name="email" {config}>
                <FormLabel>Email</FormLabel>
                <FormInput placeholder="name@exaample.com" />
                <FormValidation />
              </FormField>
            </FormItem>

            <FormItem>
              <FormField name="company" {config}>
                <FormLabel>Company</FormLabel>
                <FormInput
                  placeholder="Example Inc."
                  type="text"
                  autoComplete="company"
                />
                <FormValidation />
              </FormField>
            </FormItem>

            <FormItem>
              <FormField name="firstName" {config}>
                <FormLabel>First Name</FormLabel>
                <FormInput
                  placeholder="Max"
                  type="text"
                  autoComplete="given-name"
                />
                <FormValidation />
              </FormField>
            </FormItem>

            <FormItem>
              <FormField name="lastName" {config}>
                <FormLabel>Last Name</FormLabel>
                <FormInput
                  placeholder="Mustermann"
                  type="text"
                  autoComplete="family-name"
                />
                <FormValidation />
              </FormField>
            </FormItem>

            <FormItem class="col-span-full">
              <FormField name="message" {config}>
                <FormLabel>Message</FormLabel>
                <FormTextarea
                  class="h-32"
                  placeholder="Type your message here..."
                  type="text"
                  autoComplete="off"
                />
                <FormValidation />
              </FormField>
            </FormItem>

            <FormButton
              class="ml-auto col-span-full"
              disabled={!tainted}
              loading={submitting}
            >
              Send Message
            </FormButton>
          </Form>
        </Card>
      {/if}
    </div>
  </Container>
</Shell>
