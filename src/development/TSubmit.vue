<script lang="ts">
import { defineComponent } from 'vue';
import TButton from '../components/TButton.vue';

export default defineComponent({
  name: 'TSubmit',
  extends: TButton,
  setup: TButton.setup,
});
</script>
