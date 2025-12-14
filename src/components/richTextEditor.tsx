import { useMantineTheme } from '@mantine/core';
import { RichTextEditor } from '@mantine/tiptap';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import type { Editor } from '@tiptap/react';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';

import { useSystemTheme } from '@/hooks/useSystemTheme';

interface JobDescriptionEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: number;
}

export interface JobDescriptionEditorRef {
  clear: () => void;
}

export const JobDescriptionEditor = forwardRef<
  JobDescriptionEditorRef,
  JobDescriptionEditorProps
>(
  (
    {
      value,
      onChange,
      placeholder = 'Enter job description...',
      minHeight = 300,
    },
    ref
  ) => {
    const systemTheme = useSystemTheme();
    const theme = useMantineTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    const editor = useEditor({
      extensions: [
        StarterKit,
        Placeholder.configure({ placeholder }),
        TextAlign.configure({
          types: ['heading', 'paragraph'],
        }),
      ],
      content: value,
      onUpdate: ({ editor }) => onChange(editor.getHTML()),
    });

    // ⭐ Expose clear() to parent
    useImperativeHandle(ref, () => ({
      clear: () => {
        editor?.commands.clearContent();
      },
    }));

    if (!mounted) return null;

    const isDark = systemTheme === 'dark';

    return (
      <RichTextEditor
        editor={editor as Editor}
        style={{ minHeight }}
        styles={{
          root: {
            borderRadius: theme.radius.md,
            border: `1px solid ${
              isDark ? theme.colors.dark[4] : theme.colors.gray[3]
            }`,
            backgroundColor: isDark ? theme.colors.dark[7] : theme.white,
          },
          toolbar: {
            backgroundColor: isDark
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
            borderBottom: `1px solid ${
              isDark ? theme.colors.dark[4] : theme.colors.gray[3]
            }`,
          },
          content: {
            backgroundColor: isDark ? theme.colors.dark[7] : theme.white,
            color: isDark ? theme.white : theme.black,
            minHeight,
            padding: theme.spacing.md,
          },
        }}
      >
        <RichTextEditor.Toolbar sticky stickyOffset={0}>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            <RichTextEditor.Strikethrough />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.H1 />
            <RichTextEditor.H2 />
            <RichTextEditor.H3 />
            <RichTextEditor.H4 />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.BulletList />
            <RichTextEditor.OrderedList />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Blockquote />
            <RichTextEditor.CodeBlock />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Link />
            <RichTextEditor.Unlink />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.AlignLeft />
            <RichTextEditor.AlignCenter />
            <RichTextEditor.AlignRight />
          </RichTextEditor.ControlsGroup>
        </RichTextEditor.Toolbar>

        <RichTextEditor.Content />
      </RichTextEditor>
    );
  }
);
