import React, { useState } from 'react';
import {
  Box,
  Button,
  Inline,
  Icon,
  Spinner
} from "@stripe/ui-extension-sdk/ui";

interface PlanInfo {
  planName: string;
  planDisplayName: string;
  monthlySyncLimit: number;
  currentMonthUsage: number;
  remainingSyncs: number;
  status: string;
}

interface SubscriptionManagementProps {
  planInfo: PlanInfo | null;
  onFetchPortalUrl: () => Promise<string>;
  onError: (error: string) => void;
}

export const SubscriptionManagement: React.FC<SubscriptionManagementProps> = ({
  planInfo,
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

  return (
    <Box css={{ stack: "y", rowGap: "medium" }}>
      {planInfo && (
        <Box css={{
          padding: "medium",
          background: "container",
          borderRadius: "medium"
        }}>
          <Box css={{ stack: "y", rowGap: "small" }}>
            <Inline css={{ fontWeight: 'semibold' }}>
              Current plan: {planInfo.planDisplayName}
            </Inline>
            <Inline css={{ font: 'body' }}>
              Sync limit: {planInfo.monthlySyncLimit === -1 ? 'Unlimited' : planInfo.monthlySyncLimit} syncs per month
            </Inline>
            <Inline css={{ font: 'body' }}>
              Used this month: {planInfo.currentMonthUsage}
            </Inline>
          </Box>
        </Box>
      )}

      <Box css={{
        stack: "y",
        rowGap: "medium",
        distribute: "space-between",
        alignY: "center",
        padding: "medium",
        background: "container",
        borderRadius: "medium"
      }}>
        <Inline css={{color: 'primary', fontWeight: 'semibold'}}>
          Manage Subscription
        </Inline>
        
        <Inline>
          Access your billing history, update payment methods, and manage your subscription.
        </Inline>

      {!customerPortalUrl ? (
        <Button 
          onPress={handleGetPortalUrl}
          disabled={loading}
          type="secondary"
          size="medium"
        >
          { loading && (<Spinner size='small'/>)}
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
    </Box>
  );
};