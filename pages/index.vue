<script lang="ts" setup>
import { ToDo } from "@prisma/client";
import axios from "axios";

const listItems = ref<ToDo[]>([]);

async function getListItems() {
  const { data } = await axios.get<{ data: ToDo[] }>(
    "http://localhost:3000/api/todo"
  );
  listItems.value = [...data.data];
}

async function newItem() {
  const description = prompt("Descrição do item");

  const { data } = await axios.post<{ data: ToDo }>(
    "http://localhost:3000/api/todo",
    {
      description,
      done: false,
    }
  );

  await getListItems();

  alert("Item adicionado");
}

async function toggleDone(id: number) {
  const { data } = await axios.put<{ data: ToDo }>(
    `http://localhost:3000/api/todo/${id}`,
    {
      done: !listItems.value.find((item) => item.id === id)?.done,
    }
  );

  await getListItems();

  alert("Item marcado como " + (data.data.done ? "feito" : "não feito"));
}

async function deleteItem(id: number) {
  const { data } = await axios.delete<{ data: ToDo }>(
    `http://localhost:3000/api/todo/${id}`
  );

  await getListItems();

  alert("Item deletado");
}

onMounted(() => {
  getListItems();
});

//
</script>
<template>
  <div>
    <h1>Lista de afazeres</h1>

    <button type="button" @click="newItem()">Adicionar novo item</button>

    <ul>
      <li
        v-for="item in listItems"
        :key="item.id"
        style="display: flex; flex-direction: row"
      >
        <input
          type="checkbox"
          :checked="item.done"
          :name="`${item.id}`"
          @change="toggleDone(item.id)"
        />
        <label :for="`${item.id}`">{{ item.description }}</label>

        <button type="button" @click="deleteItem(item.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>
