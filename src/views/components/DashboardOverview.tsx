import React from 'react';
import {
  Box,
  Button,
  Inline,
  Icon
} from "@stripe/ui-extension-sdk/ui";

interface DashboardOverviewProps {
  planName: string;
  onNavigateToCheckout: () => void;
  onNavigateToSubscription: () => void;
  onNavigateToMailchimp: () => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  planName,
  onNavigateToCheckout,
  onNavigateToSubscription,
  onNavigateToMailchimp
}) => {
  return (
    <Box css={{ stack: "y", rowGap: "small" }}>
      {/* Checkout Session Card */}
      <Box css={{
        stack: "x",
        // columnGap: "small",
        distribute: "space-between",
        alignY: "center",
        padding: "medium",
        background: "container",
        borderRadius: "medium"
      }}>
        <Box css={{ stack: "y", rowGap: "small" }}>
          <Inline css={{ font: 'body', fontWeight: 'semibold' }}>
            Checkout Session
          </Inline>
          <Inline css={{ font: 'caption' }}>
            Sync new customers to your Mailchimp Audience
          </Inline>
        </Box>
        <Button
          onPress={onNavigateToCheckout}
          type="secondary"
          size="small"
        >
          <Icon name="arrowRight" />
        </Button>
      </Box>

      {/* Manage Subscription Card */}
      {planName !== "FREE" && (
        <Box css={{
          stack: "x",
          distribute: "space-between",
          alignY: "center",
          padding: "medium",
          background: "container",
          borderRadius: "medium"
        }}>
          <Box css={{ stack: "y", rowGap: "small" }}>
            <Inline css={{ font: 'body', fontWeight: 'semibold' }}>
              Manage Subscription
            </Inline>
            <Inline css={{ font: 'caption' }}>
              Update billing and manage your plan
            </Inline>
          </Box>
          <Button
            onPress={onNavigateToSubscription}
            type="secondary"
            size="small"
          >
            <Icon name="arrowRight" />
          </Button>
        </Box>
      )}

      {/* Manage Mailchimp Card */}
      <Box css={{
        stack: "x",
        distribute: "space-between",
        alignY: "center",
        padding: "medium",
        background: "container",
        borderRadius: "medium"
      }}>
        <Box css={{ stack: "y", rowGap: "small" }}>
          <Inline css={{ font: 'body', fontWeight: 'semibold' }}>
            Manage Mailchimp
          </Inline>
          <Inline css={{ font: 'caption' }}>
            Disconnect or manage your Mailchimp integration
          </Inline>
        </Box>
        <Button
          onPress={onNavigateToMailchimp}
          type="secondary"
          size="small"
        >
          <Icon name="arrowRight" />
        </Button>
      </Box>
    </Box>
  );
};