<template>
  <div class="flex-center position-ref">
      <div id="vue-wrapper">
        <div class="content">
          <div class="form-group text-left">
            <label for="distance">Distance:</label>
            <input type="number" class="form-control" id="distance" name="distance"
              required v-model="newItem.distance" placeholder=" Enter Distance">
          </div>

          <div class="form-group text-left">
          </div>

          <div class="form-group text-left">
            <label for="startDate">StartDate:</label>
            <input type="text" class="form-control" id="startDate" name="startDate"
              required v-model="newItem.startDate" placeholder=" Enter StartDate">
          </div>

          <div class="form-group text-left">
            <label for="endDate">EndDate:</label>
            <input type="text" class="form-control" id="endDate" name="endDate"
              required v-model="newItem.endDate" placeholder=" Enter EndDate">
          </div>

          <div class="form-group text-left">
            <label for="comment">Comment:</label>
            <input type="text" class="form-control" id="comment" name="comment"
              required v-model="newItem.comment" placeholder=" Enter Comment">
          </div>
          <div class="form-group">
            <button class="btn btn-primary add-button" name="add-button" @click.prevent="createItem()">
                <span class="glyphicon glyphicon-plus"></span> Create Entry
            </button>
          </div>

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
                <th>No</th>
                <th>Distance</th>
                <th>StartDate</th>
                <th>EndDate</th>
                <th>Comment</th>
                <th>Edit & Delete</th>
              </tr>
            </thead>
            <tr v-for="(item, index) in items">
              <td>{{ indexNumber(index) }}</td>
              <td>{{ item.distance }}</td>
              <td>{{ item.startdate }}</td>
              <td>{{ item.enddate }}</td>
              <td>{{ item.comment }}</td>

              <td id="show-modal" class="btn btn-info">
                <span @click="showModal=true; setVal(item.id, item.distance, item.startdate, item.enddate, item.comment)" >EDIT</span>
              </td>

              <td class="btn btn-danger" @click.prevent="deleteItem(item)">
                <span class="glyphicon glyphicon-trash">DELETE</span>
              </td>
            </tr>
          </table>
        </div>

        <modal v-if="showModal" @close="showModal=false">
          <h3 slot="header">Edit Entry</h3>
          <div slot="body">
            <input type="hidden" disabled class="form-control" id="e_id" name="id"
                    required  :value="this.e_id">
              ID:
            <input type="number" class="form-control" id="e_distance" name="distance"
                    required  :value="this.e_distance">
              StartDate:
            <input type="text" class="form-control" id="e_startDate" name="startDate"
                  required  :value="this.e_startDate">
              EndDate:
            <input type="text" class="form-control" id="e_endDate" name="endDate"
                  required  :value="this.e_endDate">
              Comment:
            <input type="text" class="form-control" id="e_comment" name="comment"
                  required  :value="this.e_comment">
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
        <script type="text/x-template" id="modal-template">
        <transition name="modal">
            <div class="modal-mask">
                <div class="modal-wrapper">
                    <div class="modal-container">
                        <div class="modal-header">
                            <slot name="header">
                                default header
                            </slot>
                        </div>
                        <div class="modal-body">
                            <slot name="body"></slot>
                        </div>
                        <div class="modal-footer">
                            <slot name="footer"></slot>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        </script>
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
    e_id: '',
    e_distance: '',
    e_startDate: '',
    e_endDate: '',
    e_comment: '',
    newItem: { 'id': '','distance': '','startDate': '','endDate': '','comment': '' },
  }),
  mounted: function mounted() {
    this.getVueItems();
  },
  methods: {
    indexNumber: function (index) {
        return index+1
    },
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
    setVal(val_id, val_distance, val_startDate, val_endDate, val_comment) {
        this.e_id = val_id;
        this.e_startDate = val_startDate;
        this.e_endDate = val_endDate;
        this.e_comment = val_comment;
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
          _this.newItem = { 'distance': '', 'startDate': '', 'endDate': '', 'comment': ''};
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
      var distance = document.getElementById('e_distance');
      var startDate = document.getElementById('e_startDate');
      var endDate = document.getElementById('e_endDate');
      var comment = document.getElementById('e_comment');

      this.showModal=false;
      var data = {
        id: id.value,
        distance: distance.value,
        startDate: startDate.value,
        endDate: endDate.value,
        comment: comment.value
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
<style>
html, body {
    background-color: #fff;
    color: #636b6f;
    font-family: 'Raleway', sans-serif;
    font-weight: 100;
    height: auto;
    margin: 0;
}
.full-height {
    min-height: 100vh;
}
.flex-center {
    align-items: center;
    display: flex;
    justify-content: center;
}
.position-ref {
    position: relative;
}
.top-right {
    position: absolute;
    right: 10px;
    top: 18px;
}
.content {
/*  text-align: center; */
}
.title {
    font-size: 84px;
}
.m-b-md {
    margin-bottom: 30px;
}
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}
.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}
.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}
.modal-body {
  margin: 20px 0;
}
.add-button {
    width: 100% !important;
}
</style>


