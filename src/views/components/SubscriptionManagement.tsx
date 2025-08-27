import React, { useState } from 'react';
import {
  Box,
  Button,
  Inline,
  Icon
} from "@stripe/ui-extension-sdk/ui";

interface SubscriptionManagementProps {
  planName: string | undefined;
  onFetchPortalUrl: () => Promise<string>;
  onError: (error: string) => void;
}

export const SubscriptionManagement: React.FC<SubscriptionManagementProps> = ({
  planName,
  onFetchPortalUrl,
  onError
}) => {
  const [customerPortalUrl, setCustomerPortalUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGetPortalUrl = async () => {
    setLoading(true);
    try {
      const url = await onFetchPortalUrl();
      setCustomerPortalUrl(url);
    } catch (err) {
      onError((err as Error).message || "Failed to fetch customer portal URL");
    } finally {
      setLoading(false);
    }
  };

  if (!planName || planName === "FREE") return null;

  return (
    <Box css={{ 
      stack: "y", 
      rowGap: "medium", 
      // padding: "large",
      background: "surface",
      borderRadius: "medium"
    }}>
      <Inline css={{font: 'heading', color: 'primary', fontWeight: 'semibold'}}>
        Manage Subscription
      </Inline>
      
      <Inline>
        Access your billing history, update payment methods, and manage your subscription.
      </Inline>

      {!customerPortalUrl ? (
        <Button 
          onPress={handleGetPortalUrl}
          loading={loading}
          type="secondary"
          size="medium"
        >
          Get Management Link
        </Button>
      ) : (
        <Box css={{ stack: "y", rowGap: "medium" }}>
          <Inline tone="positive">
            Click below to open your customer portal.
          </Inline>
          <Button 
            href={customerPortalUrl}
            type="primary"
            size="medium"
          >
            Open Customer Portal
            <Icon name="external"/>
          </Button>
        </Box>
      )}
    </Box>
  );
};