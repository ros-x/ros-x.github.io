import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  ros2XmakeSidebar: [
    {
      type: 'category',
      label: '入门',
      items: [
        'ros2-xmake/intro',
        'ros2-xmake/migration',
        'ros2-xmake/troubleshooting',
      ],
    },
    {
      type: 'category',
      label: '参考',
      items: [
        'ros2-xmake/architecture',
        'ros2-xmake/compatibility',
      ],
    },
  ],
};

export default sidebars;
