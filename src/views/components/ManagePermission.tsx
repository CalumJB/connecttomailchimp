import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Button,
  Inline,
  Select,
  Icon,
  Link
} from "@stripe/ui-extension-sdk/ui";

interface StatusOption {
  id: string;
  name: string;
  description: string;
}

interface ManagePermissionProps {
  onFetchPermissionStatus: () => Promise<{audience_status: string}>;
  onSavePermissionStatus: (status: string) => Promise<any>;
  onClearPermissionStatus?: () => Promise<any>;
  onError: (error: string) => void;
  onShowSuccess: (message: string) => void;
}

export const ManagePermission: React.FC<ManagePermissionProps> = ({
  onFetchPermissionStatus,
  onSavePermissionStatus,
  onClearPermissionStatus,
  onError,
  onShowSuccess
}) => {
  const [statuses] = useState<StatusOption[]>([
    {
      id: "pending",
      name: "Double opt-in",
      description: "New contacts will be emailed and asked to opt-in to this audience. Once accepted, contacts can recieve marketing emails. Contacts will not appear in your audience until they accept."
    },
    {
      id: "transactional", 
      name: "Transactional",
      description: "Transactional contacts cannot receive marketing messages, but they can be sent transactional messages such as receipts and shipping information."
    },
    {
      id: "subscribed",
      name: "Subscribed", 
      description: "Subscribed users are automatically added to your Mailchimp audience. They will not receive a confirmation email from Mailchimp. Be extra sure you have permission first."
    }
  ]);
  
  const [selectedStatusId, setSelectedStatusId] = useState<string>("");
  const [originalStatusId, setOriginalStatusId] = useState<string>("");
  const [statusLoading, setStatusLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);

  useEffect(() => {
    const loadStatusData = async () => {
      console.log("loadStatusData called on mount");
      setStatusLoading(true);
      try {
        const statusData = await onFetchPermissionStatus();
        console.log("HERE: " + JSON.stringify(statusData))
        const currentStatus = statusData.audience_status || "";
        console.log("loadStatusData - fetched status:", currentStatus);
        setSelectedStatusId(currentStatus);
        setOriginalStatusId(currentStatus);
        console.log("loadStatusData - set both selectedStatusId and originalStatusId to:", currentStatus);
      } catch (err) {
        onError((err as Error).message || "Failed to load permission status");
      } finally {
        setStatusLoading(false);
      }
    };

    loadStatusData();
  }, []); // Empty dependency array - only run on mount

  const handleSave = async () => {
    console.log("handleSave - selectedStatusId:", selectedStatusId, "originalStatusId:", originalStatusId);
    setSaveLoading(true);
    try {
      await onSavePermissionStatus(selectedStatusId);
      console.log("Save successful, updating originalStatusId to:", selectedStatusId);
      // Update originalStatusId immediately after successful save
      setOriginalStatusId(selectedStatusId);
      const selectedStatus = statuses.find(s => s.id === selectedStatusId);
      onShowSuccess(selectedStatusId !== "" ? `Status set to ${selectedStatus?.name}` : "Status cleared");
      console.log("Save complete - new originalStatusId should be:", selectedStatusId);
    } catch (err) {
      console.log("Save failed:", err);
      onError((err as Error).message || "Failed to save status selection");
    } finally {
      setSaveLoading(false);
    }
  };

  const hasChanges = selectedStatusId !== originalStatusId && selectedStatusId !== "";
  console.log("hasChanges:", hasChanges, "selectedStatusId:", selectedStatusId, "originalStatusId:", originalStatusId);

  return (
    <Box css={{
      stack: "y",
      rowGap: "medium",
      distribute: "space-between",
      alignY: "center",
      padding: "medium",
      background: "container",
      borderRadius: "medium"
    }}>
      <Box css={{ stack: "x", rowGap: "medium", distribute: "space-between", alignY: "center" }}>
        <Inline css={{ color: 'primary', fontWeight: 'semibold'}}>
          Audience Permissions
        </Inline>
      </Box>
      
      <Inline>
      Contacts synced to Mailchimp are assigned a permission status. Update this setting to control the types of emails your audience can receive.
      </Inline>
      <Link
              external
              href="https://mailchimp.com/help/the-importance-of-permission/"
              target="_blank"
              type="primary"
            >
              Learn about Mailchimp permissions
            </Link>
      
      {statusLoading ? (
        <Inline>Loading current status...</Inline>
      ) : (
        <>
          <Box css={{ stack: "y", rowGap: "small" }}>
            <Inline css={{font: 'body', color: 'primary', fontWeight: "semibold"}}>Select Status</Inline>
            <Select
              value={selectedStatusId}
              onChange={(event) => setSelectedStatusId(event.target.value)}
            >
              <option value="">-- Select an audience --</option>
              {statuses.map((status) => (
                <option key={status.id} value={status.id}>
                  {status.name}
                </option>
              ))}
            </Select>
                { selectedStatusId !== "subscribed" ? (
                    <Box css={{ stack: "x", columnGap: "small" }}>
                      { selectedStatusId !== "" && (
                        <>
                         <Icon name="info"/>
                  <Inline css={{ font: 'caption'}}>
                  {statuses.find(s => s.id === selectedStatusId)?.description}
                 </Inline>
                        </>
                 
                 ) }
                  </Box>
                  
                ) : (
                  <Box css={{ stack: "x", columnGap: "small", color: "critical" }}>
                  <Icon name="warning"/>
                  <Inline css={{ font: 'caption'}}>
                  {statuses.find(s => s.id === selectedStatusId)?.description}
                </Inline>
                </Box>

                )}
          </Box>
          
          <Box css={{ stack: "y", rowGap: "medium" }}>
            <Box css={{ stack: "x", columnGap: "medium" }}>
              <Button 
                onPress={handleSave} 
                loading={saveLoading}
                disabled={!hasChanges}
                type="primary"
              >
                Save Selection
              </Button>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};