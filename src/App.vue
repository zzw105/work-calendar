<template>
  <el-config-provider :locale="zhCn">
    <el-calendar ref="calendar" v-model="calendarValue" class="calendar">
      <template #header="{ date }">
        <div class="titleBar">
          <div class="dateSelection">
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
          </div>
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
        </div>
        <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item :title="`${monthSelect}月该做的事`" name="1">
            <el-input
              v-if="isWhatToDoTextareaEdit"
              v-model="whatToDoTextarea"
              :rows="4"
              type="textarea"
              placeholder="请输入"
              @blur="whatToDoTextareaBlur()"
              v-focus
            />
            <template v-else>
              {{ whatToDoTextarea || "暂无" }}
              <el-icon @click="isWhatToDoTextareaEdit = true">
                <Edit />
              </el-icon>
            </template>
          </el-collapse-item>
        </el-collapse>
      </template>
      <template #date-cell="{ data }">
        <div class="date-cell">
          <div class="day">{{ data.day.split("-").slice(1).join("-") }}</div>
          <div class="content">
            <template v-if="editKey === data.day">
              <el-input
                v-model="textareaText"
                :rows="3"
                type="textarea"
                placeholder="请输入"
                @blur="textareaBlur(data)"
                v-focus
              />
            </template>
            <template v-else>
              {{ workMessage[data.day] }}
            </template>
          </div>
        </div>
        <el-icon v-if="editKey !== data.day" @click="edit(data)">
          <Edit />
        </el-icon>
      </template>
    </el-calendar>
  </el-config-provider>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from "vue";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import type {
  CalendarDateType,
  CalendarInstance,
  CollapseModelValue,
} from "element-plus";
import { getCalendars, postCalendars } from "./api/model/calendar";

interface dataType {
  isSelected: boolean;
  type: string;
  day: string;
  date: Date;
}

const vFocus = {
  //必须以 vNameOfDirective 的形式来命名本地自定义指令，以使得它们可以直接在模板中使用。
  beforeMount: (el: HTMLElement) => {
    // 在元素上做些操作
    nextTick(() => {
      const iEle = el.children[0] as HTMLInputElement;
      iEle.focus(); //获取焦点
    });
  },
};

const calendarValue = ref(new Date());

const workMessage = ref<{ [key: string]: string }>({
  "2024-11-08": "123",
  "2024-11-09": "123",
});

const textareaText = ref("");
const editKey = ref("");

const yearSelect = ref(calendarValue.value.getFullYear());
const yearSelectOptions = [
  {
    value: 2022,
    label: "2022",
  },
  {
    value: 2023,
    label: "2023年",
  },
  {
    value: 2024,
    label: "2024年",
  },
  {
    value: 2025,
    label: "2025年",
  },
  {
    value: 2026,
    label: "2026年",
  },
  {
    value: 2027,
    label: "2027年",
  },
];

const monthSelect = ref(calendarValue.value.getMonth() + 1);
const monthSelectOptions = [
  {
    value: 1,
    label: "1月",
  },
  {
    value: 2,
    label: "2月",
  },
  {
    value: 3,
    label: "3月",
  },
  {
    value: 4,
    label: "4月",
  },
  {
    value: 5,
    label: "5月",
  },
  {
    value: 6,
    label: "6月",
  },
  {
    value: 7,
    label: "7月",
  },
  {
    value: 8,
    label: "8月",
  },
  {
    value: 9,
    label: "9月",
  },
  {
    value: 10,
    label: "10月",
  },
  {
    value: 11,
    label: "11月",
  },
  {
    value: 12,
    label: "12月",
  },
];

watch(
  () => [yearSelect.value, monthSelect.value],
  () => {
    calendarValue.value = new Date(yearSelect.value, monthSelect.value - 1);
  }
);

const calendar = ref<CalendarInstance>();
const selectDate = (val: CalendarDateType) => {
  if (!calendar.value) return;
  calendar.value.selectDate(val);
};

const edit = (data: dataType) => {
  editKey.value = data.day;
  textareaText.value = workMessage.value[data.day];
};

const textareaBlur = (data: dataType) => {
  editKey.value = "";
  workMessage.value[data.day] = textareaText.value;
  postCalendars({ day: data.day, message: textareaText.value });
  textareaText.value = "";
};

onMounted(() => {
  getCalendars().then((res) => {
    const allWorkCalendar: { [key: string]: string } = {};
    res.forEach((item) => {
      allWorkCalendar[item.day] = item.message;
    });
    workMessage.value = allWorkCalendar;
  });
});

const whatToDoTextarea = ref("");
const isWhatToDoTextareaEdit = ref(false);
const activeNames = ref(["1"]);
const handleChange = (val: CollapseModelValue) => {
  console.log(val);
};

const whatToDoTextareaBlur = () => {};
</script>

<style scoped lang="less">
.calendar {
  :deep(.el-calendar__header) {
    flex-direction: column;
    .titleBar {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
    }
  }
  :deep(.el-calendar__body) {
    thead {
      th {
        font-weight: bolder;
        font-size: 24px;
        font-family: cursive;
        background-color: #fe7e2ecc;
        color: #fff;
      }
    }
    td.current:not(.is-today) .day {
      background-color: #7591ff2f;
    }
    td.prev .day {
      background-color: #7591ff1b;
    }
    td.current.is-today {
      color: #ffaa00;

      .day {
        background-color: #7591ff63;
      }
    }

    .el-calendar-day {
      position: relative;
      padding: 0;
      .date-cell {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        // padding: 8px;
        .day {
          // border-bottom: 1px solid #ccc;
          padding: 8px;
          padding-bottom: 4px;
        }
        .content {
          flex: 1;
          word-wrap: break-word;
          white-space: pre-wrap;
          overflow: auto;
          padding: 8px;
          padding-top: 3px;
        }
      }
      .el-icon {
        position: absolute;
        display: none;
        bottom: 4px;
        right: 4px;
        transition: all 0.2s;
        &:hover {
          font-size: 20px;
        }
      }
      &:hover {
        .el-icon {
          display: block;
        }
      }
    }
  }
  :deep(.el-collapse) {
    .el-collapse-item__content {
      padding-bottom: 0;
    }
  }
}
</style>
