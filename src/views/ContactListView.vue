<template>
  <div class="container">
    <h1>Contact List</h1>
    <button class="add-contact-btn" @click="goToAddContact">Add Contact</button>
    <div v-if="loading" class="loader"></div>
    <table class="contact-table" v-if="!loading && contacts.length">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="contact in contacts" :key="contact.id">
          <td>{{ contact.name }}</td>
          <td>{{ contact.email }}</td>
          <td>{{ contact.phone }}</td>
          <td>
            <button class="edit-btn" @click="editContact(contact.id)">
              Edit
            </button>
            <button class="delete-btn" @click="deleteContact(contact.id)">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="!loading && !contacts.length">
      <p>No contacts found.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { api } from "@/utils/api";

const router = useRouter();

const contacts = ref([]);
const loading = ref(true);

async function fetchContacts() {
  try {
    const response = await api.get("/api/contacts");
    contacts.value = response.data.contacts;
  } catch (error) {
    console.error("Error fetching contacts:", error);
  } finally {
    loading.value = false;
  }
}

async function deleteContact(id) {
  try {
    await api.delete(`/api/contacts/${id}`);
    contacts.value = contacts.value.filter((contact) => contact.id !== id);
  } catch (error) {
    console.error("Error deleting contact:", error);
  }
}

function goToAddContact() {
  router.push({ name: "AddContact" });
}

function editContact(id) {
  router.push({ name: "edit-contact", params: { id } });
}

onMounted(() => {
  fetchContacts();
});
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
}

.add-contact-btn {
  margin-bottom: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.add-contact-btn:hover {
  background-color: #0056b3;
}

.contact-table {
  width: 100%;
  border-collapse: collapse;
}

.contact-table th,
.contact-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.contact-table th {
  background-color: #f2f2f2;
}

.contact-table tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

.contact-table tbody tr:hover {
  background-color: #f2f2f2;
}

.edit-btn,
.delete-btn {
  padding: 8px 12px;
  margin-right: 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.edit-btn:hover,
.delete-btn:hover {
  background-color: #f0f0f0;
}
</style>
