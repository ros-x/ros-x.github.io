import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  ros2XmakeSidebar: [
    {
      type: 'category',
      label: 'ros2-xmake',
      items: [
        'ros2-xmake/intro',
        'ros2-xmake/migration',
        'ros2-xmake/troubleshooting',
        'ros2-xmake/compatibility',
        'ros2-xmake/architecture',
      ],
    },
    {
      type: 'category',
      label: 'colcon-fish',
      items: [
        'colcon-fish/intro',
      ],
    },
  ],
};

export default sidebars;
