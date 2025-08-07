import {
  Box,
  ContextView,
  Button,
  Inline,
  Link,
} from "@stripe/ui-extension-sdk/ui";
import type { ExtensionContextValue } from "@stripe/ui-extension-sdk/context";
import { fetchStripeSignature } from "@stripe/ui-extension-sdk/utils";


import BrandIcon from "./brand_icon.svg";
import { useState } from "react";

const Home = ({ userContext, environment }: ExtensionContextValue) => {
  const [mailchimpExists, setMailchimpExists] = useState<boolean | null>(null);
  const [mailchimpData, setMailchimpData] = useState<{ stripeAccountId?: string; mailchimpAccountId?: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createUser = async () => {
    const signature = await fetchStripeSignature();

    const response = await fetch("http://localhost:8080/api/stripe/create", {
      method: "POST",
      headers: {
        "Stripe-Signature": signature,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userContext?.id,
        account_id: userContext?.account?.id,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create user");
    }

    return await response.json();
  };



  const checkMailchimpUser = async () => {
    const signature = await fetchStripeSignature();

    const response = await fetch("http://localhost:8080/api/stripe/account/mailchimp", {
      method: "POST",
      headers: {
        "Stripe-Signature": signature,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userContext?.id,
        account_id: userContext?.account?.id,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch Mailchimp user");
    }

    return await response.json();
  };

  const handleClick = async () => {
    setLoading(true);
    setError(null);
    setMailchimpExists(null);
    setMailchimpData(null);

    try {
      await createUser();

      const mailchimpResponse = await checkMailchimpUser();

      if (mailchimpResponse.exists) {
        setMailchimpExists(true);
        setMailchimpData({
          stripeAccountId: mailchimpResponse.stripeAccountId,
          mailchimpAccountId: mailchimpResponse.mailchimpAccountId,
        });
      } else {
        setMailchimpExists(false);
      }
    } catch (err) {
      setError((err as Error).message || "Unknown error");
    }

    setLoading(false);
  };

  return (
    <ContextView
      title="Dashboard homepage"
      brandColor="#F6F8FA"
      brandIcon={BrandIcon}
      externalLink={{
        label: "Stripe Apps docs",
        href: "https://stripe.com/docs/stripe-apps",
      }}
      footerContent={
        <Box css={{ marginBottom: "medium" }}>
          Questions? Get help with your app from the{" "}
          <Link
            external
            href="https://stripe.com/docs/stripe-apps"
            target="_blank"
            type="secondary"
          >
            Stripe Apps docs
          </Link>
          ,{" "}
          <Link
            external
            href="https://support.stripe.com/"
            target="_blank"
            type="secondary"
          >
            Stripe Support
          </Link>
          , or the{" "}
          <Link
            external
            href="https://discord.com/invite/stripe"
            target="_blank"
            type="secondary"
          >
            Stripe Developers Discord
          </Link>
          .
        </Box>
      }
    >
      <Box css={{ stack: "y", rowGap: "large" }}>
        <Button onPress={handleClick} loading={loading}>
          Call Backend 5
        </Button>

        {error && <Inline tone="critical">Error: {error}</Inline>}

        {mailchimpExists === true && mailchimpData && (
          <Box>
            <Inline>
              Mailchimp user exists! <br />
              Stripe Account ID: {mailchimpData.stripeAccountId} <br />
            </Inline>
          </Box>
        )}

{mailchimpExists === false && (
  <Box css={{ stack: "y", rowGap: "medium" }}>
    <Inline>
      Here I need to show the option that will redirect the user to Mailchimp.
    </Inline>

    <Link
      href={(() => {
        const clientId = "386657553310";
        const redirectUri = "http://127.0.0.1:8080/api/oauth/mailchimp/callback";
        const state = userContext?.account?.id || "";
        
        const params = new URLSearchParams({
          response_type: "code",
          client_id: clientId,
          redirect_uri: redirectUri,
          state: state
        });
        
        return `https://login.mailchimp.com/oauth2/authorize?${params.toString()}`;
      })()}
      target="_blank"
      rel="noopener noreferrer"
      type="primary"
    >
      Connect Mailchimp
    </Link>
  </Box>
)}
      </Box>
    </ContextView>
  );
};

export default Home;
