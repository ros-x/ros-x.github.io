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

  onBrokenLinks: 'warn',

  markdown: {
    format: 'detect',
  },

  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans', 'en'],
    localeConfigs: {
      'zh-Hans': { label: '简体中文', htmlLang: 'zh-Hans' },
      en: { label: 'English', htmlLang: 'en' },
    },
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
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'colcon-xmake',
        path: 'repos/colcon-xmake/docs',
        routeBasePath: 'docs/colcon-xmake',
        sidebarPath: './sidebars-colcon-xmake.ts',
        editUrl: 'https://github.com/ros-x/colcon-xmake/tree/main/',
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'ament-xmake',
        path: 'repos/ament_xmake/docs',
        routeBasePath: 'docs/ament-xmake',
        sidebarPath: './sidebars-ament-xmake.ts',
        editUrl: 'https://github.com/ros-x/ament_xmake/tree/main/',
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'tutorials',
        path: 'repos/ros2_xmake_examples/docs',
        routeBasePath: 'docs/tutorials',
        sidebarPath: './sidebars-tutorials.ts',
        editUrl: 'https://github.com/ros-x/ros2_xmake_examples/tree/main/',
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'colcon-fish',
        path: 'repos/colcon-fish/docs',
        routeBasePath: 'docs/colcon-fish',
        sidebarPath: './sidebars-colcon-fish.ts',
        editUrl: 'https://github.com/Sunrisepeak/colcon-fish/tree/main/',
      },
    ],
  ],

  themeConfig: {
    image: 'img/social-card.png',
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
          type: 'dropdown',
          label: '文档',
          position: 'left',
          items: [
            { type: 'docSidebar', sidebarId: 'ros2XmakeSidebar', label: '概览' },
            { type: 'doc', docId: 'USAGE', docsPluginId: 'colcon-xmake', label: 'colcon-xmake' },
            { type: 'doc', docId: 'RULE_SPEC', docsPluginId: 'ament-xmake', label: 'ament_xmake' },
            { type: 'doc', docId: 'pubsub', docsPluginId: 'tutorials', label: '教程' },
            { type: 'doc', docId: 'install', docsPluginId: 'colcon-fish', label: 'colcon-fish' },
          ],
        },
        {
          href: 'https://github.com/ros-x',
          label: 'GitHub',
          position: 'right',
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '项目',
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
          title: '文档',
          items: [
            {
              label: '快速开始',
              to: '/docs/ros2-xmake/intro',
            },
            {
              label: '迁移指南',
              to: '/docs/ros2-xmake/migration',
            },
          ],
        },
        {
          title: '社区',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/ros-x',
            },
            {
              label: 'xlings',
              href: 'https://github.com/d2learn/xlings',
            },
          ],
        },
      ],
      copyright: 'Copyright © 2024-2026 ros-x 贡献者。使用 Docusaurus 构建。',
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['lua', 'bash'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
