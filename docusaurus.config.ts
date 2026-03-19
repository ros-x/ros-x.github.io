import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'ros-x',
  tagline: 'ROS 2 developer tools and extensions',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://ros-x.github.io',
  baseUrl: '/',

  organizationName: 'ros-x',
  projectName: 'ros-x.github.io',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl:
            'https://github.com/ros-x/ros-x.github.io/tree/main/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl:
            'https://github.com/ros-x/ros-x.github.io/tree/main/',
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'ros-x',
      logo: {
        alt: 'ros-x Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'ros2XmakeSidebar',
          position: 'left',
          label: 'Docs',
        },
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/ros-x',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Projects',
          items: [
            {
              label: 'colcon-xmake',
              href: 'https://github.com/ros-x/colcon-xmake',
            },
            {
              label: 'ament_xmake',
              href: 'https://github.com/ros-x/ament_xmake',
            },
            {
              label: 'ros2_xmake_examples',
              href: 'https://github.com/ros-x/ros2_xmake_examples',
            },
            {
              label: 'colcon-fish',
              href: 'https://github.com/ros-x/colcon-fish',
            },
          ],
        },
        {
          title: 'Docs',
          items: [
            {
              label: 'Quick Start',
              to: '/docs/ros2-xmake/intro',
            },
            {
              label: 'Migration Guide',
              to: '/docs/ros2-xmake/migration',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/ros-x',
            },
          ],
        },
      ],
      copyright: 'Copyright \u00a9 2024-2026 ros-x contributors. Built with Docusaurus.',
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['lua', 'bash'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
