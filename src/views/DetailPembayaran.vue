<template>
  <div>
    <!-- MAIN -->
    <div class="faktur">
      <div class="d-flex faktur__boxes justify-center flex-column">
        <div class="d-flex flex-row align-center">
          <v-btn to="/" icon>
            <v-icon>{{ icons.mdiArrowLeft }}</v-icon>
          </v-btn>
          <div class="ma-4 mx-auto text-center faktur__boxes-title">
            Detail Pembayaran
          </div>
        </div>
        <v-divider></v-divider>

        <!-- PAYOUT -->
        <div class="payout">
          <div class="payout__gaji mt-4 d-flex align-center">
            <p>Subtotal Gaji</p>
            <v-spacer></v-spacer>
            <h3>Rp 2.524.000</h3>
          </div>
          <div class="payout__upah d-flex align-center">
            <p>Subtotal Upah</p>
            <v-spacer></v-spacer>
            <h3>Rp 100.000</h3>
          </div>
          <div class="payout__komisi d-flex align-center">
            <p>Subtotal Komisi</p>
            <v-spacer></v-spacer>
            <h3>Rp 200.000</h3>
          </div>
          <div class="payout__gaji-kotor d-flex align-center">
            <p>Gaji Kotor</p>
            <v-spacer></v-spacer>
            <h3>Rp 2.824.000</h3>
          </div>
          <div class="payout__tanggungan d-flex align-center">
            <p>Tanggungan</p>
            <v-spacer></v-spacer>
            <h3>(-) Rp 70.000</h3>
          </div>
          <div class="faktur__divider-dots mb-4 mt-2"></div>

          <div class="payout__gaji-bersih d-flex align-center">
            <p>Total Gaji Bersih</p>
            <v-spacer></v-spacer>
            <h3>Rp 2.124.000</h3>
          </div>
          <div class="faktur__divider-solid mb-6"></div>
        </div>

        <!-- FORM -->
        <v-form ref="formRef" class="px-4">
          <div>
            <label for="rekening" class="form__rekening"
              >Bayar Dari Rekening <span class="form__required">*</span></label
            >
            <v-autocomplete
              solo
              :rules="[rules.required('Rekening Bank')]"
              :loading="loading"
              v-model="data.selectedRekening"
              id="form__input"
              class="elevation-0"
              :items="dataRekeningArr"
              item-text="bank"
              item-value="nomor"
              elevation="0"
              placeholder="Pilih Rekening Bank"
            >
              <template #selection="data">
                <v-chip
                  v-bind="data.attrs"
                  :input-value="data.selected"
                  @click="data.select"
                >
                  {{ data.item.bank }} a.n {{ data.item.pemilik }}
                </v-chip>
              </template>
              <template #item="data">
                <template v-if="typeof data.item !== 'object'">
                  <v-list-item-content v-text="data.item"></v-list-item-content>
                </template>

                <template v-else>
                  {{ data.item.bank }} a.n {{ data.item.pemilik }} -
                  {{ data.item.nomor }}
                </template>
              </template>
            </v-autocomplete>
          </div>

          <div>
            <label class="form__rekening"
              >Dicatat Pada tanggal <span class="form__required">*</span>
            </label>
            <v-menu
              v-model="menu2"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  solo
                  class="elevation-0"
                  elevation="0"
                  v-model="date"
                  :rules="[rules.required('Dicatat Pada Tanggal')]"
                  label="Picker without buttons"
                  :prepend-icon="icons.mdiCalendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="date"
                color="primary"
                @input="menu2 = false"
              ></v-date-picker>
            </v-menu>
          </div>

          <div>
            <label for="keterangan" class="form__keterangan">Keterangan</label>
            <v-text-field
              v-model="data.keterangan"
              placeholder="Keterangan"
              solo
              class="elevation-0"
              elevation="0"
            ></v-text-field>
          </div>
        </v-form>

        <div class="submit">
          <v-btn
            color="#206CFF"
            height="49px"
            class="submit__btn text-capitalize white--text"
            elevation="0"
            :loading="loading"
            :disabled="loading"
            @click="handleSubmitGaji"
            >Submit Gaji</v-btn
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "@vue/composition-api";
import {
  mdiSquareEditOutline,
  mdiCancel,
  mdiPlus,
  mdiArrowLeft,
} from "@mdi/js";
export default {
  name: "Home",
  components: {},

  setup() {
    // ————————————————————————————————————
    //* ——— Template Ref
    // ————————————————————————————————————
    const date = new Date().toISOString().substr(0, 10);
    const modal = ref(false);
    const loading = ref(false);
    const menu2 = ref(false);
    const formRef = ref(null);
    const dataRekeningArr = ref([]);
    const data = ref({
      selectedRekening: "",
      keterangan: "",
    });

    const rules = ref({
      required(identifier) {
        return (v) => !!v || `${identifier} tidak boleh kosong.`;
      },
    });

    // ————————————————————————————————————
    //* ——— HOOKS
    // ————————————————————————————————————
    onMounted(() => {
      fetchRekeningBank();
    });

    // ————————————————————————————————————
    //* ——— Functions
    // ————————————————————————————————————

    const fetchRekeningBank = () => {
      loading.value = true;
      fetch("https://boss.smartlink.id/salary/bank ")
        .then((response) => response.json())
        .then((result) => (dataRekeningArr.value = result.data))
        .catch((error) => console.log("error", error));
      loading.value = false;
    };

    const handleSubmitGaji = () => {
      loading.value = true;
      const isFormValid = formRef.value.validate();
      if (!isFormValid) {
        loading.value = false;
        return;
      }
      let payload = {
        method: "POST",
        body: JSON.stringify({
          //datanya yang dikirim bukan seperti ini mas?
          // rekening: data.value.selectedRekening,
          // dicatat_tanggal: date.value,
          // keterangan: data.value.keterangan,

          //kena validasi testing input manual
          id_karyawan: "KRY2098201002",
          nama_karyawan: "Adnan Aziz D",
          tanggal_akhir: "2022-01-31",
          tanggal_awal: "2022-01-01",
          total_kehadiran: "24",
          total_periode: "1",
        }),
      };

      fetch("https://boss.smartlink.id/salary/save", payload)
        .then((response) => response.json())
        .then((result) => console.log(result.data))
        .catch((error) => console.log("error", error));
      loading.value = false;
    };

    return {
      // Template Ref
      date,
      modal,
      menu2,
      dataRekeningArr,
      loading,
      rules,
      formRef,

      // Form
      data,

      // icons
      mdiSquareEditOutline,
      mdiPlus,
      icons: {
        mdiCancel,
        mdiSquareEditOutline,
        mdiArrowLeft,
      },

      //Functions
      fetchRekeningBank,
      handleSubmitGaji,
    };
  },
};
</script>

<style lang="scss">
</style>
