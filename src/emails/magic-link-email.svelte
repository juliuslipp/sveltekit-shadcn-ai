<script lang="ts">
  import { siteConfig } from "$lib/config/site";
  import {
    Button,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Preview,
    Section,
    Text,
  } from "svelte-email";

  export let magicLink: string;
  export let expires: Date;

  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "";

  const fontFamily =
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif';

  const main = {
    backgroundColor: "#ffffff",
  };

  const container = {
    margin: "0 auto",
    padding: "20px 0 48px",
    width: "580px",
  };

  const heading = {
    fontFamily,
    fontSize: "32px",
    lineHeight: "1.3",
    fontWeight: "700",
    color: "#484848",
  };

  const paragraph = {
    fontFamily,
    fontSize: "18px",
    lineHeight: "1.4",
    color: "#484848",
  };

  const button = {
    fontFamily,
    backgroundColor: "#ff5a5f",
    borderRadius: "3px",
    color: "#fff",
    fontSize: "18px",
    textDecoration: "none",
    textAlign: "center" as const,
    display: "block",
    width: "100%",
  };

  const hr = {
    borderColor: "#cccccc",
    margin: "20px 0",
  };

  const footer = {
    fontFamily,
    color: "#9ca299",
    fontSize: "14px",
    marginBottom: "10px",
  };
</script>

<Html>
  <Head />
  <Preview preview="Magic Link for Logging In" />
  <Section style={main}>
    <Container style={container}>
      <Heading style={heading}>Hello!</Heading>
      <Text style={paragraph}>
        You requested a magic link to sign in to {siteConfig.name}.
      </Text>
      <Text style={paragraph}>
        Click the button below to sign in. This link will expire on {expires.toDateString()}
        at {expires.toTimeString()}.
      </Text>
      <Section style={{ padding: "16px 0 20px" }}>
        <Button pY={19} style={button} href={magicLink}>Sign In Now</Button>
      </Section>
      <Hr style={hr} />
      <Button href={baseUrl}>
        <Text style={footer}>{siteConfig.name}</Text>
      </Button>
    </Container>
  </Section>
</Html>
