import React from 'react';
import {
  Box,
  Button,
  Inline,
  Badge,
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

interface PlanInfoSectionProps {
  planInfo: PlanInfo | null;
  getPricingPageUrl: (accountId: string) => string;
  accountId: string;
  onContinueFree?: () => void;
}

export const PlanInfoSection: React.FC<PlanInfoSectionProps> = ({
  planInfo,
  getPricingPageUrl,
  accountId,
  onContinueFree
}) => {
  if (!planInfo) return null;

  return (
    <Box css={{ 
      stack: "y", 
      rowGap: "medium", 
      padding: "large",
      background: planInfo.planName === "free" ? "surface" : "container",
      borderRadius: "medium"
    }}>
      {planInfo.planName === "FREE" && (
        <Box css={{ stack: "y", rowGap: "small" }}>
          <Inline css={{ fontWeight: 'semibold'}}>
            Welcome!
          </Inline>
          <Inline>
            We&apos;ve given you 20 free syncs this month so you can explore the app.
          </Inline>
          <Inline>
            Subscribe anytime to unlock more syncs and keep your data flowing.
          </Inline>
          <Box css={{paddingTop: "small", stack: "y", rowGap: "small"}}>
            <Button 
              href={getPricingPageUrl(accountId)}
              type="primary"
              size="medium"
              css={{width: "fill"}}
            >
              Subscribe
              <Icon name="external"/>
            </Button>
            <Button 
              type="secondary"
              size="medium"
              css={{width: "fill"}}
              onPress={onContinueFree}
            >
              Continue Free
            </Button>
          </Box>                
        </Box>
      )}
    </Box>
  );
};