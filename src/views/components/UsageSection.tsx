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
  
        <Box css={{ 
          stack: "y", 
          rowGap: "small", 
          padding: "medium",
          background: "container",
          borderRadius: "medium"
        }}>
    
          <Inline>
            You only have {planInfo.remainingSyncs} syncs remaining.
          </Inline>
          <Inline css={{ fontWeight: "bold"}}>
            Get 1000 syncs for $10 per month.
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
     
    </Box>
    
  );
};