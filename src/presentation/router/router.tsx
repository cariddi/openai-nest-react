import type { JSX } from 'react';
import { Navigate, createBrowserRouter } from 'react-router';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { AssistantPage, AudioToTextPage, ImageGenerationPage, OrthographyPage, ProsConsPage, ProsConsStreamPage, TextToAudioPage, TranslatePage } from '../pages';
import { ImageTunningPage } from '../pages/image-generation/ImageTunningPage';

export type MenuItem = {
  to: string;
  icon: string;
  title: string;
  description: string;
  component: JSX.Element;
}

export const menuRoutes: MenuItem[] = [
  {
    to: "/orthography",
    icon: "fa-solid fa-spell-check",
    title: "Orthography",
    description: "Correct orthography",
    component: <OrthographyPage />
  },
  {
    to: "/pros-cons",
    icon: "fa-solid fa-code-compare",
    title: "Pros & Cons",
    description: "Compare pros & cons",
    component: <ProsConsPage />
  },
  {
    to: "/pros-cons-stream",
    icon: "fa-solid fa-water",
    title: "As stream",
    description: "As stream of messages",
    component: <ProsConsStreamPage />
  },
  {
    to: "/translate",
    icon: "fa-solid fa-language",
    title: "Translate",
    description: "Translate test to diff languages",
    component: <TranslatePage />
  },
  {
    to: "/text-to-audio",
    icon: "fa-solid fa-podcast",
    title: "Text to audio",
    description: "Convert text to audio",
    component: <TextToAudioPage />
  },
  {
    to: "/audio-to-text",
    icon: "fa-solid fa-comment-dots",
    title: "Audio to text",
    description: "Convert audio to text",
    component: <AudioToTextPage />
  },
  {
    to: "/image-generation",
    icon: "fa-solid fa-image",
    title: "Images",
    description: "Generate images",
    component: <ImageGenerationPage />
  },
  {
    to: "/image-tunning",
    icon: "fa-solid fa-wand-magic",
    title: "Edit image",
    description: "Continuous Generation",
    component: <ImageTunningPage />
  },
  {
    to: "/assistant",
    icon: "fa-solid fa-user",
    title: "Asistant",
    description: "Info of the Asistant",
    component: <AssistantPage />
  },
];

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      ...menuRoutes.map((route) => ({
        path: route.to,
        element: route.component,
      })),
      {
        path: "",
        element: <Navigate to={menuRoutes[0].to} />,
      }
    ],
  }
])
