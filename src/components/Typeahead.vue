<template>
  <div>
    <input type="text" v-model="selected" @keyup="onKeyUp" @input="onKeyUp"
           @focus="filterOptions" @blur="lostFocus">
    <ul class="suggestion-area" v-if="isListVisible">
      <li v-for="(option, i) in filteredOptions" @click="selectOption" :class="liClass(i)" >
        {{ option }}
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  data() {
    return {
      selected: '',
      selectedIndex: 0,
      filteredOptions: [],
      isListVisible: false,
    }
  },
  props: ['options'],
  methods: {
    liClass(i) {
      return {
        active: (i === this.selectedIndex),
      }
    },
    onKeyUp (e) {
      console.log(e)
      switch (e.key) {
        case 'Control':
        case 'CapsLock':
        case 'Shift':
          return false
        case 'ArrowDown':
          if (this.selectedIndex !==  this.filteredOptions.length - 1) {
            this.selectedIndex += 1
          }
          break;
        case 'ArrowUp':
          if (this.selectedIndex > 0) {
            this.selectedIndex -= 1
          }
          break;
        case 'Enter':
          this.selected = this.filteredOptions[this.selectedIndex]
          this.isListVisible = false
          break;
        default:
          this.filterOptions(e)
      }
    },
    filterOptions (e) {
      if (this.selected === '') {
        this.isListVisible = false
        return false
      }

      this.isListVisible = true
      this.filteredOptions = this.options.filter( (text) => {
        var regex =  new RegExp(this.selected, 'i')
        return (text.match(regex))
      })

      this.selectedIndex = 0
    },

    selectOption (e) {
      this.selected = e.target.innerText
      this.isListVisible = false
    },

    lostFocus (e) {
      setTimeout(() => {this.isListVisible = false}, 500)
    },
  }
}

</script>

<style lang="scss">
.suggestion-area {
  z-index: 0;
  position: absolute;
  background: white;
  max-height: 100px;
  li {
    border: solid 1px gray;
    padding: 2px;
    list-style: none;
  }
  .active {
    background-color: orange;
  }
}
</style>
