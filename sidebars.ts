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
        'ros2-xmake/examples',
        'ros2-xmake/cli-reference',
        'ros2-xmake/rule-api',
        'ros2-xmake/rosidl',
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
