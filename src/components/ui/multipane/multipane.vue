<template>
  <div
    ref="container"
    :class="[
      'multipane',
      {['main-layout-' + layout.slice(0, 1)]: layout},
      {'is-resizing': isResizing}
    ]"
    :style="{ cursor, userSelect }"
    @mousedown="onMouseDown"
  >
    <slot></slot>
  </div>
</template>

<script>
import { computed, ref } from "vue";

const LAYOUT_HORIZONTAL = 'horizontal';
const LAYOUT_VERTICAL = 'vertical';

export default {
  name: 'multipane',
  emits: ['paneResizeStart', 'paneResizeStop', 'paneResize'],
  props: {
    layout: {
      type: String,
      default: LAYOUT_VERTICAL,
    },
  },
  setup(props, { emit }) {
    const isResizing = ref(false);
    const container = ref(null);

    const cursor = computed(() => {
      return isResizing.value ? props.layout === LAYOUT_VERTICAL ? 'col-resize' : 'row-resize' : '';
    });

    const userSelect = computed(() => {
      return isResizing.value ? 'none' : '';
    });

    const onMouseDown = ({ target: resizer, pageX: initialPageX, pageY: initialPageY }) => {
      if (resizer.className && resizer.className.match('multipane-resizer')) {

        let pane = resizer.previousElementSibling;
        let { offsetWidth: initialPaneWidth, offsetHeight: initialPaneHeight } = pane;
        let usePercentage = !!(pane.style.width + '').match('%');

        const resize = (initialSize, offset = 0) => {
          if (props.layout === LAYOUT_VERTICAL) {
            let containerWidth = container.value.clientWidth;
            let paneWidth = initialSize + offset;

            return (pane.style.width = usePercentage
              ? paneWidth / containerWidth * 100 + '%'
              : paneWidth + 'px');
          }

          if (props.layout === LAYOUT_HORIZONTAL) {
            let containerHeight = container.value.clientHeight;
            let paneHeight = initialSize + offset;

            return (pane.style.height = usePercentage
              ? paneHeight / containerHeight * 100 + '%'
              : paneHeight + 'px');
          }
        };

        // This adds is-resizing class to container
        isResizing.value = true;

        // Resize once to get current computed size
        let size = resize();

        // Trigger paneResizeStart event
        emit('paneResizeStart', pane, resizer, size);

        const onMouseMove = ({ pageX, pageY }) => {
          if (props.layout === LAYOUT_VERTICAL) {
            size = resize(initialPaneWidth, pageX - initialPageX);
          } else {
            size = resize(initialPaneHeight, pageY - initialPageY);
          }
          emit('paneResize', pane, resizer, size);
        };

        const onMouseUp = () => {
          // Run resize one more time to set computed width/height.
          if (props.layout === LAYOUT_VERTICAL) {
            size = resize(pane.clientWidth);
          } else {
            size = resize(pane.clientHeight);
          }

          // This removes is-resizing class to container
          isResizing.value = false;

          window.removeEventListener('mousemove', onMouseMove);
          window.removeEventListener('mouseup', onMouseUp);

          emit('paneResizeStop', pane, resizer, size);
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
      }
    };

    return {
      isResizing,
      container,
      cursor,
      userSelect,
      onMouseDown
    };
  }
};
</script>

<style lang="scss" src="./multipane.scss"/>
