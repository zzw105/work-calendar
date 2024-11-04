<template>
  <el-config-provider :locale="zhCn">
    <el-calendar ref="calendar" @select="selectDate1">
      <template #header="{ date }">
        <span>
          <el-select
            v-model="yearSelect"
            placeholder="Select"
            style="width: 100px"
          >
            <el-option
              v-for="item in yearSelectOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-select
            v-model="monthSelect"
            placeholder="Select"
            style="width: 100px"
          >
            <el-option
              v-for="item in monthSelectOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </span>
        <span>{{ date }}</span>
        <el-button-group>
          <el-button size="small" @click="selectDate('prev-month')">
            上个月
          </el-button>
          <el-button size="small" @click="selectDate('today')">今</el-button>
          <el-button size="small" @click="selectDate('next-month')">
            下个月
          </el-button>
        </el-button-group>
      </template>
      <template #date-cell="{ data }">
        <p :class="data.isSelected ? 'is-selected' : ''">
          {{ data.day.split("-").slice(1).join("-") }}
          {{ data.isSelected ? "✔️" : "" }}
        </p>
      </template>
    </el-calendar>
  </el-config-provider>
</template>

<script setup lang="ts">
import { ref } from "vue";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import type { CalendarDateType, CalendarInstance } from "element-plus";

const yearSelect = ref("");
const yearSelectOptions = [
  {
    value: "2022",
    label: "2022",
  },
  {
    value: "2023",
    label: "2023",
  },
  {
    value: "2024",
    label: "2024",
  },
  {
    value: "2025",
    label: "2025",
  },
  {
    value: "2026",
    label: "2026",
  },
  {
    value: "2027",
    label: "2027",
  },
];

const monthSelect = ref("");
const monthSelectOptions = [
  {
    value: "1",
    label: "1月",
  },
  {
    value: "2",
    label: "2月",
  },
  {
    value: "3",
    label: "3月",
  },
  {
    value: "4",
    label: "4月",
  },
  {
    value: "5",
    label: "5月",
  },
  {
    value: "6",
    label: "6月",
  },
  {
    value: "7",
    label: "7月",
  },
  {
    value: "8",
    label: "8月",
  },
  {
    value: "9",
    label: "9月",
  },
  {
    value: "10",
    label: "10月",
  },
  {
    value: "11",
    label: "11月",
  },
  {
    value: "12",
    label: "12月",
  },
];

const calendar = ref<CalendarInstance>();
const selectDate = (val: CalendarDateType) => {
  if (!calendar.value) return;
  calendar.value.selectDate(val);
};

const selectDate1 = () => {
  console.log(22);
};
</script>

<style scoped></style>
