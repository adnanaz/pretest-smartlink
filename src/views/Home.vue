<template>
  <div>
    <!-- MAIN -->
    <div class="faktur">
      <div class="d-flex faktur__boxes justify-center flex-column">
        <div class="ma-5 text-center faktur__boxes-title">Faktur gaji</div>
        <v-divider></v-divider>
        <div class="faktur__name">
          <h3>Bu Adara Olivia</h3>
          <p>01 Januari 2021 - 31 Januari 2021</p>
          <div class="faktur__divider-dots"></div>
        </div>
        <div class="faktur__absence d-flex">
          <p>Masuk 22 Hari</p>
          <v-spacer></v-spacer>
          <p
            @click="baseDialogKeterlambatan.isVisible = true"
            class="faktur__absence-edit"
          >
            Ubah Kehadiran
          </p>
        </div>
        <div class="faktur__divider-solid"></div>
        <!-- GAJI -->
        <div class="faktur__items">
          <h3>Gaji</h3>
          <div
            v-for="(el, id) in gajiArr"
            :key="id"
            class="d-flex align-center mt-2"
          >
            <div>
              <h4>{{ el.name }}</h4>
              <p class="faktur__items-special">
                {{ el.moneyXperiod }} x {{ el.absence }}
              </p>
            </div>
            <v-spacer></v-spacer>
            <div class="d-flex align-center" style="margin-right: 1rem">
              <p class="faktur__items-price mb-0">{{ el.amount }}</p>
              <v-btn
                @click="handleDialog(el.id)"
                color="#206CFF"
                elevation="0"
                icon
              >
                <v-icon color="#206CFF">{{ el.icon }}</v-icon>
              </v-btn>
            </div>
          </div>
          <div class="faktur__divider-dots"></div>
          <div class="faktur__subtotal d-flex">
            <h3>Subtotal Gaji</h3>
            <v-spacer></v-spacer>
            <p>Rp.524.000</p>
          </div>
          <div class="faktur__divider-solid"></div>
          <!-- UPAH -->
          <div class="faktur__items">
            <h3 class="faktur__items-upah">Upah Borongan</h3>
            <v-divider></v-divider>
            <div
              v-for="(el, id) in aktifitasArr"
              :key="id"
              class="d-flex align-center mt-2"
            >
              <div>
                <h4>{{ el.name }}</h4>
                <p class="faktur__items-special">{{ el.weight }} KG</p>
              </div>
              <v-spacer></v-spacer>
              <div class="d-flex align-center">
                <p class="faktur__items-price mb-0">{{ el.amount }}</p>
                <v-btn
                  style="margin-right: 1rem"
                  color="#206CFF"
                  elevation="0"
                  icon
                >
                  <v-icon color="#206CFF">{{ el.icon }}</v-icon>
                </v-btn>
              </div>
            </div>
            <div class="faktur__divider-dots"></div>
            <div class="faktur__subtotal d-flex">
              <h3>Subtotal Upah</h3>
              <v-spacer></v-spacer>
              <p>Rp 100.000</p>
            </div>
          </div>
          <div class="faktur__divider-solid"></div>
          <!-- KOMISI -->
          <div class="faktur__items custom">
            <h3>Komisi</h3>
            <v-divider></v-divider>
            <div class="d-flex align-center">
              <v-btn icon outlined color="#206CFF" x-small class="mt-3 ml-4"
                ><v-icon>{{ mdiPlus }}</v-icon></v-btn
              >
              <div
                @click="
                  baseDialogKomisi.isVisible = true;
                  komisiVal = null;
                "
                class="custom__add-commision mt-3 ml-2"
              >
                Tambah komisi lain...
              </div>
            </div>
            <div
              v-for="(el, id) in komisiArr"
              :key="id"
              class="d-flex align-center mt-2"
            >
              <div>
                <h4>{{ el.name }}</h4>
              </div>
              <v-spacer></v-spacer>
              <div class="d-flex align-center">
                <p class="faktur__items-price mb-0">{{ el.amount }}</p>
                <v-btn
                  color="#206CFF"
                  elevation="0"
                  @click="handleComission(el.amount)"
                  style="margin-right: 1rem"
                  icon
                >
                  <v-icon color="#206CFF">{{ el.icon }}</v-icon>
                </v-btn>
              </div>
            </div>
            <div class="faktur__divider-dots"></div>
            <div class="faktur__subtotal d-flex">
              <h3>Subtotal Komisi</h3>
              <v-spacer></v-spacer>
              <p class="mt-4">Rp 200.000</p>
            </div>
          </div>
          <div class="faktur__divider-solid"></div>
          <div class="faktur__subtotal-special d-flex">
            <h3>Total Gaji Kotor</h3>
            <v-spacer></v-spacer>
            <p>Rp 100.000</p>
          </div>
          <div class="faktur__divider-solid"></div>
          <!-- TANGGUNGAN -->
          <div class="faktur__items custom__tanggungan">
            <h3>Tanggungan</h3>
            <p>Karyawan ini memiliki tanggungan Rp 570.000</p>
            <v-divider></v-divider>
            <div class="d-flex align-center">
              <v-btn icon outlined color="#206CFF" x-small class="mt-3 ml-4"
                ><v-icon>{{ mdiPlus }}</v-icon></v-btn
              >
              <div
                @click="
                  baseDialogDenda.isVisible = true;
                  dendaVal = null;
                "
                class="custom__add-commision mt-3 ml-2"
              >
                Tambah pembayaran tanggungan...
              </div>
            </div>
            <div
              v-for="(el, id) in komisiArr"
              :key="id"
              class="d-flex align-center mt-2"
            >
              <div>
                <h4>{{ el.name }}</h4>
              </div>
              <v-spacer></v-spacer>
              <div class="d-flex align-center">
                <p class="custom__price mb-0">{{ el.amount }}</p>
                <v-btn
                  @click="handlePunishment(el.amount)"
                  color="#206CFF"
                  style="margin-right: 1rem"
                  elevation="0"
                  icon
                >
                  <v-icon color="#206CFF">{{ el.icon }}</v-icon>
                </v-btn>
              </div>
            </div>
            <div class="faktur__divider-dots"></div>
            <div class="faktur__subtotal custom__tanggungan-subtotal d-flex">
              <h3>Tanggungan Dibayar</h3>
              <v-spacer></v-spacer>
              <p>(-) Rp 70.000</p>
            </div>
          </div>
          <div class="faktur__divider-solid"></div>
          <div class="faktur__subtotal custom__total d-flex">
            <h3>Total Gaji Bersih</h3>
            <img
              width="13px"
              class="mt-2"
              height="13px"
              :src="require('@/assets/images/checklist.png')"
              alt="icon-checklist"
            />
            <v-spacer></v-spacer>
            <p>Rp 2.124.000</p>
          </div>
          <p class="custom__total-special">
            Nominal akhir yang diterima karyawan setelah ditambah komisi
            dikurangi pembayaran tanggungan (jika ada).
          </p>
        </div>
        <div class="submit">
          <v-btn
            color="#206CFF"
            class="submit__btn text-capitalize white--text"
            elevation="0"
            >Berikutnya</v-btn
          >
        </div>
      </div>
    </div>

    <!-- DIALOG -->
    <base-dialog
      ref="baseDialogKeterlambatan"
      mode="keterlambatan"
      title="Ubah Kehadiran"
    ></base-dialog>
    <base-dialog
      ref="baseDialogGapok"
      mode="gapok"
      title="Ubah Gaji Pokok"
    ></base-dialog>
    <base-dialog
      ref="baseDialogLembur"
      mode="lembur"
      title="Ubah Uang Absen/Transport/Lembur"
    ></base-dialog>
    <base-dialog
      ref="baseDialogKomisi"
      mode="komisi"
      title="Tambah / Ubah Komisi"
      :komisiVal="komisiVal"
    ></base-dialog>
    <base-dialog
      ref="baseDialogDenda"
      mode="denda"
      title="Bayar Tanggungan / Denda"
      :dendaVal="dendaVal"
    ></base-dialog>
  </div>
</template>

<script>
import baseDialog from "@/components/base/baseDialog.vue";
import { ref } from "@vue/composition-api";
import { mdiSquareEditOutline, mdiCancel, mdiPlus } from "@mdi/js";
export default {
  name: "Home",
  components: {
    baseDialog,
  },
  setup() {
    // ————————————————————————————————————
    //* ——— Template Ref
    // ————————————————————————————————————
    const gajiArr = ref([
      {
        id: 0,
        name: "Gaji Pokok",
        moneyXperiod: 800000,
        absence: "1 Periode",
        amount: 80000,
        icon: mdiSquareEditOutline,
      },
      {
        id: 1,
        name: "Uang Makan",
        moneyXperiod: 10000,
        absence: "22 Kehadiran",
        amount: 220000,
        icon: mdiSquareEditOutline,
      },
      {
        id: 2,
        name: "Uang Absen",
        moneyXperiod: 12000,
        period: 0,
        absence: "22 Kehadiran",
        amount: 264000,
        icon: mdiSquareEditOutline,
      },
      {
        id: 3,
        name: "Uang Transport",
        moneyXperiod: 15000,
        period: 0,
        absence: "22 Kehadiran",
        amount: 330000,
        icon: mdiSquareEditOutline,
      },
      {
        id: 4,
        name: "Uang  Snack",
        moneyXperiod: 5000,
        period: 0,
        absence: "22 Kehadiran",
        amount: 110000,
        icon: mdiSquareEditOutline,
      },
    ]);
    const aktifitasArr = ref([
      {
        id: 0,
        name: "Mencuci",
        weight: 100,
        amount: 20000,
        icon: mdiCancel,
      },
      {
        id: 1,
        name: "Menyetrika",
        weight: 59,
        amount: 80000,
        icon: mdiCancel,
      },
    ]);
    const komisiArr = ref([
      {
        id: 0,
        name: "Bonus Target 1",
        amount: 20000,
        icon: mdiSquareEditOutline,
      },
    ]);
    const tanggunganArr = ref([
      {
        id: 0,
        name: "Ganti Barang Hilang",
        desc: "Baju yang hilang warna merah",
        amount: 50000,
        icon: mdiSquareEditOutline,
      },
      {
        id: 1,
        name: "Denda Keterlambatan",
        desc: "karena terlambat 3 hari berturut - turut ",
        amount: 20000,
        icon: mdiSquareEditOutline,
      },
    ]);

    const baseDialogKeterlambatan = ref(null);
    const baseDialogGapok = ref(null);
    const baseDialogLembur = ref(null);
    const baseDialogKomisi = ref(null);
    const baseDialogDenda = ref(null);
    const komisiVal = ref(null);
    const dendaVal = ref(null);

    // ————————————————————————————————————
    //* ——— Functions
    // ————————————————————————————————————
    const handleDialog = (key) => {
      /**
       * ARGS: key as id -> gajiArr.id
       */
      switch (key) {
        case 0:
          baseDialogGapok.value.isVisible = true;
          break;
        case 1:
          baseDialogLembur.value.isVisible = true;
          break;
        case 2:
          baseDialogLembur.value.isVisible = true;
          break;
        case 3:
          baseDialogLembur.value.isVisible = true;
          break;
        case 4:
          baseDialogLembur.value.isVisible = true;
          break;
        default:
          break;
      }
    };
    const handleComission = (amount) => {
      /**
       * ARGS:
       * amount -> komisiArr.amount
       */
      baseDialogKomisi.value.isVisible = true;
      komisiVal.value = amount;
    };
    const handlePunishment = (amount) => {
      /**
       * ARGS:
       * amount -> tanggunganArr.amount
       */
      baseDialogDenda.value.isVisible = true;
      dendaVal.value = amount;
    };
    return {
      // Template Ref
      gajiArr,
      aktifitasArr,
      komisiArr,
      tanggunganArr,
      komisiVal,
      dendaVal,

      // BaseDialog
      baseDialogKeterlambatan,
      baseDialogGapok,
      baseDialogLembur,
      baseDialogKomisi,
      baseDialogDenda,

      // icons
      mdiSquareEditOutline,
      mdiCancel,
      mdiPlus,

      //Functions
      handleDialog,
      handleComission,
      handlePunishment,
    };
  },
};
</script>

<style lang="scss">
.faktur {
  display: flex;
  justify-content: center;

  &__boxes {
    width: 360px;
    border: 1px solid #ededed;

    &-title {
      font-weight: 700;
      font-size: 16px;
      line-height: 155%;
      /* identical to box height, or 25px */
      letter-spacing: -0.02em;
      /* Black */
      color: #000000;
    }
  }

  &__name {
    margin-top: 1rem;

    h3 {
      padding: 0 1rem;
      font-weight: 700;
      font-size: 18px;
      line-height: 155%;
      letter-spacing: -0.02em;
      /* Black */
      color: #000000;
    }
    p {
      padding: 0 1rem;
      margin-bottom: 0;
      font-weight: 400;
      font-size: 14px;
      line-height: 150%;
      /* semi-fade */
      color: #6f7287;
    }
  }

  &__divider-dots {
    margin-top: 1rem;
    /* super fade */
    border: 1px dashed #ededed;
  }

  &__divider-solid {
    height: 12px;
    /* super fade */
    border: 1px solid #f2f5f7;
    background: #f2f5f7;
  }

  &__absence {
    margin-top: 1rem;
    padding: 0 1rem;

    &-edit {
      font-weight: 600;
      font-size: 14px;
      line-height: 150%;
      /* identical to box height, or 21px */
      text-align: right;
      letter-spacing: -0.02em;
      /* blue smartlink */
      color: #206cff;
      cursor: pointer;
    }

    &-edit:hover {
      transition: all 0.2s ease-in-out;
      color: #4da9fa;
    }
  }

  &__items {
    margin: 1rem 0;
    &-upah {
      margin-bottom: 1rem;
    }

    h3 {
      padding: 0 1rem;
      font-style: normal;
      font-weight: 700;
      padding: 0 1rem;
      font-size: 16px;
      line-height: 155%;
      /* identical to box height, or 25px */
      letter-spacing: -0.02em;
      /* Black */
      color: #000000;
    }
    h4 {
      padding: 0 1rem;
      font-weight: 400;
      font-size: 14px;
      line-height: 150%;
      /* identical to box height, or 21px */
      letter-spacing: -0.02em;
      /* Black */
      color: #000000;
    }
    &-special {
      padding: 0 1rem;

      font-size: 12px;
      line-height: 150%;
      /* identical to box height, or 18px */
      letter-spacing: -0.02em;
      /* Mid Grey */
      color: #6f7287;
    }
    &-price {
      font-weight: 400;
      font-size: 14px;
      line-height: 150%;
      /* identical to box height, or 21px */
      text-align: right;
      letter-spacing: -0.02em;
      /* Black */
      color: #000000;
    }

    .v-icon__svg {
      height: 20px;
      width: 20px;
      fill: currentColor;
    }

    .faktur__subtotal {
      margin-top: 1rem;

      h3 {
        padding: 0 1rem;
        font-weight: 600;
        font-size: 16px;
        line-height: 155%;
        /* identical to box height, or 25px */
        letter-spacing: -0.02em;
      }

      p {
        padding: 0 1rem;
        font-weight: 600;
        font-size: 16px;
        line-height: 155%;
        /* identical to box height, or 25px */
        text-align: right;
        letter-spacing: -0.02em;
        /* Black */
        color: #000000;
      }
    }

    .faktur__subtotal-special {
      margin-top: 1rem;
      h3 {
        padding: 0 1rem;
        font-weight: 600;
        font-size: 18px;
        line-height: 155%;
        /* identical to box height, or 28px */
        letter-spacing: -0.02em;
        color: #00a88a;
      }

      p {
        padding: 0 1rem;
        font-weight: 600;
        font-size: 18px;
        line-height: 155%;
        /* identical to box height, or 28px */
        text-align: right;
        letter-spacing: -0.02em;
        color: #00a88a;
      }
    }
  }

  .custom {
    border: none;
    h3 {
      padding: 0 1rem;
      margin: 1rem 0;
    }

    &__add-commision {
      cursor: pointer;
      /* Smartlink Blue */
      color: #206cff;
      font-weight: 600;
    }
    &__add-commision:hover {
      transition: all 0.2s ease-in-out;
      color: #4da9fa;
    }

    &__tanggungan {
      p {
        padding: 0 1rem;
        font-weight: 400;
        font-size: 12px;
        line-height: 150%;
        /* identical to box height, or 18px */
        letter-spacing: -0.02em;
        /* Mid Grey */
        color: #6f7287;
        margin-bottom: 1rem;
      }
      &-subtotal {
        h3 {
          padding: 0 1rem;

          font-weight: 600;
          font-size: 18px;
          line-height: 155%;
          /* identical to box height, or 28px */
          letter-spacing: -0.02em;
          /* Black */
          color: #000000;
        }
        p {
          padding: 0 1rem;
          font-weight: 600;
          font-size: 18px;
          line-height: 155%;
          /* identical to box height, or 28px */
          text-align: right;
          letter-spacing: -0.02em;
          color: #eb5757;
        }
      }
    }

    &__total {
      h3 {
        padding: 0 1rem;
        font-weight: 800;
        font-size: 20px;
        line-height: 155%;
        /* identical to box height, or 31px */
        letter-spacing: -0.02em;
        color: #206cff;
      }
      p {
        padding: 0 1rem;
        font-weight: 800;
        font-size: 20px;
        line-height: 155%;
        /* identical to box height, or 31px */
        text-align: right;
        letter-spacing: -0.02em;
        color: #206cff;
      }
      &-special {
        padding: 0 1rem;

        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 150%;
        /* or 18px */
        letter-spacing: -0.02em;
        /* Mid Grey */
        color: #6f7287;
      }
    }
    &__hectic {
      font-size: 16px;
      line-height: 155%;
      /* identical to box height, or 25px */
      display: flex;
      align-items: center;
      letter-spacing: -0.02em;
      color: #000000;
    }

    &__price {
      /**
      * Special case got override from 
      * .faktur .custom__tanggungan p
      */

      font-weight: 400 !important;
      font-size: 14px !important;
      line-height: 150% !important;
      /* identical to box height, or 21px */
      text-align: right !important;
      letter-spacing: -0.02em !important;
      /* Black */
      color: #000000 !important;
    }
  }

  .dots__special {
    margin-bottom: 1rem;
  }

  .submit {
    padding: 0 1rem;
    margin-bottom: 1rem;
    &__btn {
      width: 100%;
      height: 49px;
      border-radius: 3px;
    }
  }
}
</style>
