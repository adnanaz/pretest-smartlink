<template>
  <v-dialog v-model="isVisible" scrollable max-width="380">
    <template #activator="{ on, attrs }">
      <v-btn color="primary" dark v-bind="attrs" v-on="on"> Open Dialog </v-btn>
    </template>
    <!-- Case Edit Keterlambatan -->
    <v-card v-if="mode == 'keterlambatan'" class="dialog" max-height="250px">
      <v-card-title class="dialog__title">
        <h3 class="push__left">{{ title }}</h3>
        <v-spacer></v-spacer>
        <v-btn icon @click="isVisible = false">
          <v-icon>{{ mdiClose }}</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="dialog__text">
        <span class="dialog__text-special">Durasi Keterlambatan</span>
        <div class="d-flex">
          <div class="">
            <v-btn small elevation="0" class="custom__btn" height="47px">
              <v-icon color="#206cff">{{ mdiMinus }}</v-icon>
            </v-btn>
          </div>
          <input type="number" class="custom__input" />
          <v-btn small elevation="0" class="custom__btn" height="47px">
            <v-icon color="#206cff">{{ mdiPlus }}</v-icon>
          </v-btn>
        </div>
      </v-card-text>

      <v-card-actions
        class="px-4 mt-1 mb-4 dialog__action d-flex justify-center"
      >
        <v-btn
          color="error"
          class="text-capitalize"
          elevation="0"
          outlined
          height="47px"
          width="160px"
          @click="isVisible = false"
        >
          Hapus
        </v-btn>
        <v-btn
          width="160px"
          height="47px"
          color="primary"
          class="text-capitalize ml-4"
          elevation="0"
          @click="isVisible = false"
        >
          Simpan
        </v-btn>
      </v-card-actions>
    </v-card>
    <!-- Case Edit Gaji Pokok -->
    <v-card v-else-if="mode == 'gapok'" class="dialog" max-height="250px">
        <v-card-title class="dialog__title">
        <h3 class="push__left">{{ title }}</h3>
        <v-spacer></v-spacer>
        <v-btn icon @click="isVisible = false">
          <v-icon>{{ mdiClose }}</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="dialog__text">
        <span class="dialog__text-special">Nominal</span>
        <div class="d-flex">
            <div class="custom__currency">
              Rp
            </div>
            <input type="number" class="custom__input-currency" />
            <div class="custom__x align-self-center mx-2">
              <v-img :src="require('@/assets/images/x3.png')"></v-img>
            </div>
            <input type="number" class="custom__input-currency2" />
            <div class="custom__currency2">
              Periode
            </div>
          </div>
      </v-card-text>

      <v-card-actions
        class="px-4 mt-1 mb-4 dialog__action d-flex justify-center"
      >
      
        <v-btn

          width="100%"
          height="47px"
          color="primary"
          class="text-capitalize "
          elevation="0"
          @click="isVisible = false"
        >
          Simpan
        </v-btn>
      </v-card-actions>
    </v-card>
    
  </v-dialog>
</template>

<script>
import { ref } from "@vue/composition-api";
import { mdiClose, mdiMinus, mdiPlus } from "@mdi/js";

export default {
  props: {
    mode: {
      type: String,
      required: false,
      default: "",
    },
    title: {
      type: String,
      required: false,
      default: "",
    },
  },
  setup() {
    const choosedCountry = ref("");
    const isVisible = ref(false);

    return { choosedCountry, isVisible, mdiClose, mdiMinus, mdiPlus };
  },
};
</script>

<style lang="scss">
.dialog {
  border-radius: 10px 10px 0px 0px;
  &__title {
    h3 {
      font-weight: 700;
      font-size: 16px;
      line-height: 155%;
      /* identical to box height, or 25px */
      display: flex;
      align-items: center;
      text-align: center;
      letter-spacing: -0.02em;

      /* Black */
      color: #000000;
    }
  }

  &__text {
    padding: 1rem !important;

    &-special {
      font-weight: 400;
      font-size: 14px;
      line-height: 150%;
      /* identical to box height, or 21px */

      display: flex;
      align-items: center;
      letter-spacing: -0.02em;

      /* Mid Grey */

      color: #6f7287;
    }
  }
}

.push__left {
  margin-left: 6rem;
}

.custom {
  border: 1px solid #c8d0dd;
  border-radius: 3px 0px 0px 3px;
  &__btn {
    /* White */
    background: #ffffff;
    width: 40px;
    padding: 0;
    /* Blue Muted */
    box-sizing: border-box;
  }

  &__input {
    background: #ffffff;
    width: 240px;
    height: 48px;
    /* Blue Muted */
    border: 1px solid #c8d0dd;
    box-sizing: border-box;
    border-radius: 3px;
    text-align: center;
  }

  &__currency {
    width:52px;
    padding:11px 16px 11px 16px;
    height:47px;
    background: #F6F6F6;
    /* Blue Muted */
    border: 1px solid #C8D0DD;
    box-sizing: border-box;
    border-radius: 3px 0px 0px 3px;
  }

   &__currency2 {
    width:86px;
    padding:11px 16px 11px 16px;
    height:47px;
    background: #F6F6F6;
    /* Blue Muted */
    border: 1px solid #C8D0DD;
    box-sizing: border-box;
    border-radius: 3px 0px 0px 3px;
  }

  &__input-currency {
  background: #FFFFFF;
  /* Blue Muted */
  border: 1px solid #C8D0DD;
  border-left:none;
  box-sizing: border-box;
  width:106px;
  border-radius: 3px;
  }

  &__input-currency2 {
  background: #FFFFFF;
  width:70px;
  /* Blue Muted */
  border: 1px solid #C8D0DD;
  border-right:none;
  box-sizing: border-box;
  border-radius: 3px;
  }

  &__x {
    font-size: 16px;
  }

}

//removes arrows input type number
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>