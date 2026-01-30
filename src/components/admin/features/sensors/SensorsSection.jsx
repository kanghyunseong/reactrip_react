import React from "react";
import styled from "styled-components";
import { Surface } from "../../ui/AdminUI.styles";
import RaspberryPiRealtimeWidget from "../../charts/RaspberryPiRealtimeWidget";

const WidgetCard = styled(Surface)`
  padding: 1.25rem;
  overflow: hidden;
`;

const SensorsSection = () => {
  return (
    <>
      <WidgetCard>
        <RaspberryPiRealtimeWidget />
      </WidgetCard>
    </>
  );
};

export default SensorsSection;

