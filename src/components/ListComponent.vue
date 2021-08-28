<template>
    <div class="row justify-content-center">
        <div class="col-md-12">
            <!-- content -->
             <h1>Show Students</h1>
             <div class="row">
                 <div class="col-md-12">
                     <table class="table table-striped">
                         <thead class="table-dark">
                             <tr>
                                 <th>Name</th>
                                 <th>Email</th>
                                 <th>Phone</th>
                                 <th>Actions</th>
                             </tr>
                         </thead>
                         <tbody>
                             <tr v-for="student in students" :key="student._id">
                                 <td>{{student.name}}</td>
                                 <td>{{student.email}}</td>
                                 <td>{{student.phone}}</td>
                                 <td>
                                     <router-link class="btn btn-success" :to="{name: 'edit', params: {id: student._id}}">Edit</router-link>
                                     <button class="btn btn-danger" @click.prevent="deleteStudent(student._id)">Delete</button>
                                 </td>
                             </tr>
                         </tbody>
                     </table>
                 </div>
             </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data(){
        return {
            students: []
        }
    },
    created(){
        let apiURL = 'http://localhost:4000/api';
        axios.get(apiURL).then(res => {
            this.students = res.data
        }).catch(error => {
            console.log(error)
        })
    },
    methods: {
        deleteStudent(id) {
            let apiURL = `http://localhost:4000/api/delete-student/${id}`;
            let indexOfArrayItem = this.students.findIndex(i => i.id === id);
            if (window.confirm("Do you really want ot delete?")) {
                axios.delete(apiURL).then(() => {
                    this.students.splice(indexOfArrayItem, 1)
                }).catch(error => {
                    console.log(error)
                })
            }
        }
    },
}
</script>