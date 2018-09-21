<template>
  <div class="flex-center position-ref full-height">
      <div id="vue-wrapper">
        <div class="content">
          <div class="form-group text-left">
            <label for="name">Name:</label>
            <input type="text" class="form-control" id="name" name="name"
              required v-model="newItem.name" placeholder=" Enter some name">
          </div>

          <div class="form-group text-left">
            <vue-ctk-date-time-picker></vue-ctk-date-time-picker>
          </div>

<!--           <div class="input-append date form_datetime">
            <input size="16" type="text" value="" readonly>
            <span class="add-on"><i class="icon-th"></i></span>
          </div>
 -->
<!--           <div class="form-group text-left">
            <vue-ctk-date-time-picker></vue-ctk-date-time-picker>
          </div>
 -->
          <div class="form-group text-left">
            <label for="age">Count:</label>
            <input type="number" class="form-control" id="count" name="count"
              required v-model="newItem.count" placeholder=" Enter Jogging Count">
          </div>

          <div class="form-group text-left">
            <label for="profession">Profession:</label>
            <input type="text" class="form-control" id="profession" name="profession"
              required v-model="newItem.profession" placeholder=" Enter your profession">
          </div>

          <button class="btn btn-primary" id="name" name="name" @click.prevent="createItem()">
            <span class="glyphicon glyphicon-plus"></span> ADD
          </button>

        <p class="text-center alert alert-danger"
            v-if="hasError">Please fill name!</p>
        <p class="text-center alert alert-danger"
            v-if="hasCountError">Please enter count!</p>
        <!-- {{ csrf_field() }} -->
        <p class="text-center alert alert-success"
            v-if="hasDeleted">Deleted Successfully!</p>
        <div class="table table-borderless" id="table">
          <table class="table table-borderless" id="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Count</th>
                <th>Profession</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tr v-for="item in items">
              <td>{{ item.id }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.count }}</td>
              <td>{{ item.profession }}</td>

              <td id="show-modal" class="btn btn-info">
                <span @click="showModal=true; setVal(item.id, item.name, item.count)" >EDIT</span>
              </td>

              <td class="btn btn-danger" @click.prevent="deleteItem(item)">
                <span class="glyphicon glyphicon-trash">DELETE</span>
              </td>
            </tr>
          </table>
        </div>

        <modal v-if="showModal" @close="showModal=false">
          <h3 slot="header">Edit Item</h3>
          <div slot="body">

            <input type="hidden" disabled class="form-control" id="e_id" name="id"
                    required  :value="this.e_id">
              Name:
            <input type="text" class="form-control" id="e_name" name="name"
                    required  :value="this.e_name">
              Count:
            <input type="number" class="form-control" id="e_count" name="count"
                  required  :value="this.e_count">

          </div>
          <div slot="footer">
            <button class="btn btn-default" @click="showModal = false">
              Cancel
            </button>

            <button class="btn btn-info" @click="editItem()">
              Update
            </button>
          </div>
        </modal>

      </div>
    </div>
  </div>
</template>

<script type="text/javascript">

import {get, post} from '../helpers/api'

export default {
  name: 'data-show',
  data: ()=> ({
    items: [],
    hasError: false,
    hasDeleted: false,
    hasCountError: false,
    showModal: false,
    e_name: '',
    e_count: '',
    e_id: '',
    e_profession: '',
    newItem: { 'name': '','count': '','profession': '' },
  }),
  mounted: function mounted() {
    this.getVueItems();
  },
  methods: {
    getVueItems: function getVueItems() {
      var _this = this;

      get('/api/jogging/getall')
      .then((response) => {
        _this.items = response.data;
      })
      .catch((err) => {
        console.log("error");
      })
    },
    setVal(val_id, val_name, val_count) {
        this.e_id = val_id;
        this.e_name = val_name;
        this.e_count = val_count;
    },

    createItem: function createItem() {
      var _this = this;
      var input = this.newItem;

      if (input['name'] == '') {
        this.hasError = true;
      } else if (input['count'] == ''){
        this.hasCountError = true;
      } else {
        this.hasError = false;
        post('/api/jogging/register', input)
        .then((response) => {
          console.log("success!!!");
          _this.newItem = { 'name': '', 'count': '', 'profession': ''};
          _this.getVueItems();
        })
        .catch((err) => {
          console.log("error");
        })
        this.hasError = false;
        this.hasCountError = false;
      }
    },
    editItem: function(){
      var id = document.getElementById('e_id');
      var name = document.getElementById('e_name');
      var count = document.getElementById('e_count');

      this.showModal=false;
      var data = {
        id: id.value,
        name: name.value,
        count: count.value
      }
      post('/api/jogging/update', data)
      .then((response) => {
        console.log("success!");
        this.getVueItems();
        this.showModal=false;
      })
      .catch((err) => {
        console.log("error!");
      })
    },
    deleteItem: function deleteItem(item) {
      var _this = this;

      var data = {
        id: item.id
      };

      post('/api/jogging/delete', data)
      .then((response) => {
        console.log("success!");
        _this.getVueItems();
        _this.hasError = false;
        _this.hasDeleted = true;
      })
      .catch((err) => {
        console.log("error!");
      })
    }
  }
}
</script>

