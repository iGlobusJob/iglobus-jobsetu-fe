import { Box, Stack, Text, Title } from '@mantine/core';
import React from 'react';

interface NodeItem {
  text: string;
  left: number;
  width: number;
  top?: number;
  height?: number;
  gradient?: boolean;
  isLarge?: boolean;
}

interface WorkflowConfig {
  title: string;
  width: number;
  nodes: NodeItem[];
  row1Arrows: { x1: number; x2: number }[];
  loop: { startX: number; endX: number; rightX: number };
  leftArrow: { x1: number; x2: number };
}

const titleStyle = {
  fontFamily: "'Inter', sans-serif",
  fontWeight: 500,
  fontSize: '27px',
  lineHeight: '33px',
  textAlign: 'center' as const,
  color: '#008EFC',
  margin: 0,
};

const EMPLOYER_WORKFLOW: WorkflowConfig = {
  title: 'Employer Workflow',
  width: 1290,
  nodes: [
    { text: 'Register Organisation', left: 0, width: 210, gradient: true },
    { text: 'Maintain Company Profile', left: 316.66, width: 228 },
    { text: 'Create Job', left: 657.61, width: 203 },
    { text: 'Publish/Manage Status', left: 993.61, width: 208 },
    { text: 'Review Candidates', left: 897.61, width: 218, top: 207 },
    {
      text: 'Decide & Close Loop.',
      left: 351.61,
      width: 382,
      top: 174.5,
      height: 145,
      isLarge: true,
    },
  ],
  row1Arrows: [
    { x1: 210, x2: 316.66 },
    { x1: 544.66, x2: 657.61 },
    { x1: 860.61, x2: 993.61 },
  ],
  loop: { startX: 1201.61, endX: 1115.61, rightX: 1269.61 },
  leftArrow: { x1: 897.61, x2: 733.61 },
};

const RECRUITER_WORKFLOW: WorkflowConfig = {
  title: 'Recruiter Workflow',
  width: 1250,
  nodes: [
    { text: 'Sign In', left: 0, width: 172.39, gradient: true },
    { text: 'Review Open Jobs', left: 298.05, width: 172.39 },
    { text: 'Inspect Client Context', left: 620, width: 203 },
    { text: 'Review Candidates', left: 956, width: 208 },
    { text: 'AI-Assisted Evaluation', left: 860, width: 218, top: 207 },
    {
      text: 'Share Shortlist & Next Steps',
      left: 314,
      width: 382,
      top: 174.5,
      height: 145,
      isLarge: true,
    },
  ],
  row1Arrows: [
    { x1: 172.39, x2: 298.05 },
    { x1: 470.44, x2: 620 },
    { x1: 823, x2: 956 },
  ],
  loop: { startX: 1164, endX: 1078, rightX: 1232 },
  leftArrow: { x1: 860, x2: 696 },
};

const WorkflowTrack: React.FC<{ config: WorkflowConfig }> = ({ config }) => (
  <Stack gap="36px" align="center" style={{ width: '100%' }}>
    <Title order={2} style={titleStyle}>
      {config.title}
    </Title>
    <Box
      style={{
        width: '100%',
        overflowX: 'auto',
        WebkitOverflowScrolling: 'touch',
        paddingBottom: '16px',
      }}
    >
      <Box
        style={{
          width: `${config.width}px`,
          height: '350px',
          margin: '0 auto',
          position: 'relative',
        }}
      >
        <svg
          width={config.width}
          height="350"
          viewBox={`0 0 ${config.width} 350`}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            pointerEvents: 'none',
            zIndex: 1,
          }}
        >
          {config.row1Arrows.map(({ x1, x2 }, i) => (
            <g key={i}>
              <line
                x1={x1}
                y1="60"
                x2={x2}
                y2="60"
                stroke="#008EFC"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <polyline
                points={`${x2 - 12},52 ${x2},60 ${x2 - 12},68`}
                fill="none"
                stroke="#008EFC"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          ))}
          <path
            d={`M ${config.loop.startX} 60 L ${config.loop.rightX - 24} 60 A 24 24 0 0 1 ${config.loop.rightX} 84 L ${config.loop.rightX} 223 A 24 24 0 0 1 ${config.loop.rightX - 24} 247 L ${config.loop.endX} 247`}
            fill="none"
            stroke="#008EFC"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <polyline
            points={`${config.loop.endX + 12},239 ${config.loop.endX},247 ${config.loop.endX + 12},255`}
            fill="none"
            stroke="#008EFC"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line
            x1={config.leftArrow.x1}
            y1="247"
            x2={config.leftArrow.x2}
            y2="247"
            stroke="#008EFC"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <polyline
            points={`${config.leftArrow.x2 + 12},239 ${config.leftArrow.x2},247 ${config.leftArrow.x2 + 12},255`}
            fill="none"
            stroke="#008EFC"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {config.nodes.map((node, i) => (
          <Box
            key={i}
            style={{
              position: 'absolute',
              left: `${node.left}px`,
              top: `${node.top ?? 20}px`,
              width: `${node.width}px`,
              height: `${node.height ?? 80}px`,
              borderRadius: node.isLarge ? '58px' : '32px',
              background: node.gradient
                ? 'linear-gradient(155.7deg, #75A3E1 15.55%, #FFFFFF 100%)'
                : '#FFFFFF',
              border: node.gradient ? 'none' : '4px solid #008EFC',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 2,
              boxSizing: 'border-box',
              padding: node.isLarge ? '32px' : '16px',
            }}
          >
            <Text
              style={{
                fontFamily: "'Roboto Mono', monospace",
                fontWeight: 500,
                fontSize: node.isLarge ? '20px' : '16px',
                lineHeight: node.isLarge ? '30px' : '24px',
                textAlign: 'center',
                letterSpacing: '-0.011em',
                color: 'rgba(0, 0, 0, 0.8)',
                margin: 0,
              }}
            >
              {node.text}
            </Text>
          </Box>
        ))}
      </Box>
    </Box>
  </Stack>
);

export const WorkflowsSection: React.FC = () => (
  <Box
    component="section"
    id="workflows"
    style={{
      width: '100%',
      backgroundColor: '#FFFFFF',
      padding: '60px 20px',
      boxSizing: 'border-box',
      overflow: 'hidden',
    }}
  >
    <style>
      {
        "@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Roboto+Mono:wght@400;500;600&display=swap');"
      }
    </style>
    <Box
      style={{
        width: '100%',
        maxWidth: '1440px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '64px',
      }}
    >
      <WorkflowTrack config={EMPLOYER_WORKFLOW} />
      <WorkflowTrack config={RECRUITER_WORKFLOW} />
      <Stack gap="20px" align="center" style={{ width: '100%' }}>
        <Title order={2} style={titleStyle}>
          Candidate Workflow
        </Title>
        <Box
          style={{
            width: '100%',
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <img
            src="/home/candidate-workflow.png"
            alt="Candidate Workflow"
            style={{
              width: '100%',
              maxWidth: '1000px',
              height: 'auto',
              display: 'block',
              objectFit: 'contain',
              imageRendering: '-webkit-optimize-contrast',
            }}
          />
        </Box>
      </Stack>
    </Box>
  </Box>
);

export default WorkflowsSection;
