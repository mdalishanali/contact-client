<template>
  <div class="container">
    <h1>Contact List</h1>
    <button class="add-contact-btn" @click="goToAddContact">Add Contact</button>
    <table class="contact-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody v-if="contacts.length">
        <tr v-for="contact in contacts" :key="contact.id">
          <td>{{ contact.name }}</td>
          <td>{{ contact.email }}</td>
          <td>{{ contact.phone }}</td>
          <td>
            <router-link
              :to="{ name: 'view-contact', params: { id: contact.id } }"
              >View</router-link
            >
            <router-link
              :to="{ name: 'edit-contact', params: { id: contact.id } }"
              >Edit</router-link
            >
            <button @click="deleteContact(contact.id)">Delete</button>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td colspan="4">No contacts found.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();

const contacts = ref([]); // Assume you fetch contacts from API or store

async function fetchContacts() {
  try {
    const response = await axios.get("your-api-endpoint/contacts");
    contacts.value = response.data.contacts;
  } catch (error) {
    console.error("Error fetching contacts:", error);
  }
}

async function deleteContact(id) {
  try {
    await axios.delete(`your-api-endpoint/contacts/${id}`);
    contacts.value = contacts.value.filter((contact) => contact.id !== id);
  } catch (error) {
    console.error("Error deleting contact:", error);
  }
}

function goToAddContact() {
  router.push({ name: "add-contact" });
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
</style>
