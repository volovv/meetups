<template>
  <div class="toasts">
    <div
      v-for="toast in toasts"
      :key="toast.id"
      class="toast"
      :class="`toast_${toast.type}`"
    >
      <app-icon :icon="toast.icon" />
      <span>{{ toast.message }}</span>
    </div>
  </div>
</template>

<script>
import AppIcon from "@/components/ui/AppIcon";

const DELAY = 5000;

export default {
  name: "AppToast",

  components: { AppIcon },

  data() {
    return {
      // список сообщений
      toasts: {},
      // ид нового добавляемого сообщения
      toastId: 0
    };
  },

  methods: {
    // вывести сообщение об ошибке
    error(message, toastId) {
      this.createToast({
        type: "error",
        icon: "alert-circle",
        message,
        toastId
      });
    },

    // вывести сообщение об успехе
    success(message, toastId) {
      this.createToast({
        type: "success",
        icon: "check-circle",
        message,
        toastId
      });
    },

    // создание сообщения
    createToast({ type = null, icon = null, message = null, toastId = null }) {
      // узнать ид для нового сообщения
      let newToastId = toastId || ++this.toastId;

      // удалить тост, если уже есть с таким ид
      if (this.toasts[newToastId]) {
        this.removeToast(newToastId);
      }

      // добавить параметры нового сообщения
      this.$set(this.toasts, newToastId, {
        id: newToastId,
        type: type,
        icon: icon,
        message: message,
        timeout: setTimeout(() => {
          // удалить сообщение из списка после DELAY ms
          this.$delete(this.toasts, newToastId);
        }, DELAY)
      });
    },

    // удаление сообщения
    removeToast(toastId) {
      if (toastId !== undefined && this.toasts[toastId]) {
        clearTimeout(this.toasts[toastId].timeout);
        this.$delete(this.toasts, toastId);
      }
    }
  }
};
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

.toast {
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 18px;
  line-height: 28px;
  width: auto;
}

.toast + .toast {
  margin-top: 20px;
}

.toast > .icon {
  margin-right: 12px;
}

.toast.toast_success {
  color: var(--green);
}

.toast.toast_error {
  color: var(--red);
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}
</style>
