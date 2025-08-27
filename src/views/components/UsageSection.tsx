import React from 'react';
import {
  Box,
  Button,
  Inline,
  Icon
} from "@stripe/ui-extension-sdk/ui";

interface PlanInfo {
  planName: string;
  planDisplayName: string;
  monthlySyncLimit: number;
  currentMonthUsage: number;
  remainingSyncs: number;
  status: string;
}

interface UsageSectionProps {
  planInfo: PlanInfo | null;
  getPricingPageUrl: (accountId: string) => string;
  accountId: string;
}

export const UsageSection: React.FC<UsageSectionProps> = ({
  planInfo,
  getPricingPageUrl,
  accountId
}) => {
  if (!planInfo) return null;

  return (
    <Box css={{ 
      stack: "y", 
      rowGap: "small", 
    }} >
      {planInfo.planName === "FREE" && (
        <Box css={{ 
          stack: "y", 
          rowGap: "medium", 
          padding: "large",
          background: "container",
          borderRadius: "small"
        }}>
    
          <Inline>
            You&apos;re currently on the free tier that allows 20 events per month.
          </Inline>
          <Inline>
            Subscribe to increase your allowance and keep your data flowing.
          </Inline>
          <Button 
            href={getPricingPageUrl(accountId)}
            type="primary"
            size="medium"
            css={{width:"fill"}}
          >
            Subscribe
            <Icon name="external"/>
          </Button>
        </Box>
      )}
    
    <Box css={{ 
      stack: "y", 
      rowGap: "medium", 
      padding: "large",
      background: planInfo.planName === "free" ? "surface" : "container",
      borderRadius: "medium"
    }}>
      <Box css={{ stack: "y", rowGap: "small" }}>
        <Box css={{ stack: "x", distribute: "space-between" }}>
          <Inline>
            {planInfo.currentMonthUsage} / {planInfo.monthlySyncLimit} syncs used
          </Inline>
          <Inline>
            {planInfo.remainingSyncs} remaining
          </Inline>
        </Box>
      </Box>
    </Box>
    </Box>
    
  );
};