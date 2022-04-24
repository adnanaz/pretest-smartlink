<template>
  <div>
    <!-- MAIN -->
    <div class="faktur">
      <div class="d-flex faktur__boxes justify-center flex-column">
        <div class="ma-5 text-center faktur__boxes-title">Faktur gaji</div>
        <v-divider></v-divider>
        <div class="faktur__name">
          <h3>{{ dataArr.nama_karyawan }}</h3>
          <p>
            {{ dataArr.tanggal_awal | dateFull }} -
            {{ dataArr.tanggal_akhir | dateFull }}
          </p>
          <div class="faktur__divider-dots"></div>
        </div>
        <div class="faktur__absence d-flex">
          <p>Masuk {{ dataArr.total_kehadiran }} Hari</p>
          <v-spacer></v-spacer>
          <p
            @click="handleEditKeterlambatan(dataArr.total_kehadiran)"
            class="faktur__absence-edit"
          >
            Ubah Kehadiran
          </p>
        </div>
        <div class="faktur__divider-solid"></div>

        <div class="faktur__items">
          <!-- Gaji -->
          <div>
            <h3>Gaji</h3>
            <div
              v-for="(el, id) in dataArr.pengaturan_gaji"
              :key="id"
              class="d-flex align-center mt-2"
            >
              <div>
                <h4>{{ el.nama }}</h4>
                <p class="faktur__items-special">
                  {{ el.nominal | price }} x
                  {{
                    el.jenis == "periode"
                      ? dataArr.total_periode + " Periode"
                      : dataArr.total_kehadiran + " Kehadiran"
                  }}
                </p>
              </div>
              <v-spacer></v-spacer>
              <div class="d-flex align-center" style="margin-right: 1rem">
                <p class="faktur__items-price mb-0">{{ el.nominal | price }}</p>
                <v-btn
                  @click="
                    handleDialog(
                      el.jenis,
                      el.nominal,
                      dataArr.total_periode,
                      dataArr.total_kehadiran
                    )
                  "
                  color="#206CFF"
                  elevation="0"
                  icon
                >
                  <v-icon color="#206CFF">{{
                    icons.mdiSquareEditOutline
                  }}</v-icon>
                </v-btn>
              </div>
            </div>
            <div class="faktur__divider-dots"></div>
            <div class="faktur__subtotal d-flex">
              <h3>Subtotal Gaji</h3>
              <v-spacer></v-spacer>
              <p>Rp.50.000</p>
            </div>
          </div>

          <div class="faktur__divider-solid"></div>

          <!-- UPAH -->
          <div class="faktur__items">
            <h3 class="faktur__items-upah">Upah Borongan</h3>
            <v-divider></v-divider>
            <div
              v-for="(el, id) in dataArr.pengaturan_upah"
              :key="id"
              class="d-flex align-center mt-2"
            >
              <div class="mt-4">
                <h4>{{ el.nama }}</h4>
                <!-- karena struktur api terpisah antara pengaturan upah dan 
                pengerjaan upah maka ditampilkan secara manual untuk sementara, segera saya update 
                struktur tampilan yang baru jika waktu cukup. -->
                <p class="faktur__items-special">
                  {{ dataArr.pengerjaan_upah[0].nominal }}
                  {{ dataArr.pengerjaan_upah[0].satuan }}
                </p>
              </div>
              <v-spacer></v-spacer>
              <div class="d-flex align-center">
                <p class="faktur__items-price mb-0">{{ el.nominal | price }}</p>
                <v-btn
                  disabled
                  style="margin-right: 1rem"
                  color="#206CFF"
                  elevation="0"
                  icon
                >
                  <v-icon color="#206CFF">{{ icons.mdiCancel }}</v-icon>
                </v-btn>
              </div>
            </div>
            <div class="faktur__divider-dots"></div>
            <div class="faktur__subtotal d-flex">
              <h3>Subtotal Upah</h3>
              <v-spacer></v-spacer>
              <p>Rp. 1.800</p>
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
            <!-- dummy or change to dataArr.komisi to real data -->
            <div
              v-for="(el, id) in komisiArr"
              :key="id"
              class="d-flex align-center mt-2"
            >
              <div class="mt-4">
                <h4>{{ el.name }}</h4>
              </div>
              <v-spacer></v-spacer>
              <div class="d-flex align-center mt-4">
                <p class="faktur__items-price mb-0">{{ el.amount | price }}</p>
                <v-btn
                  color="#206CFF"
                  elevation="0"
                  @click="handleComission(el.amount, el.name)"
                  style="margin-right: 1rem"
                  icon
                >
                  <v-icon color="#206CFF">{{
                    icons.mdiSquareEditOutline
                  }}</v-icon>
                </v-btn>
              </div>
            </div>
            <div class="faktur__divider-dots"></div>
            <div class="faktur__subtotal d-flex">
              <h3>Subtotal Komisi</h3>
              <v-spacer></v-spacer>
              <p class="mt-4">Rp.0</p>
            </div>
          </div>

          <div class="faktur__divider-solid"></div>
          <div class="faktur__subtotal-special d-flex">
            <h3>Total Gaji Kotor</h3>
            <v-spacer></v-spacer>
            <p>Rp 51.800</p>
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
              v-for="(el, id) in dataArr.tanggungan"
              :key="id"
              class="d-flex align-center mt-2"
            >
              <div class="mt-4">
                <h4>{{ el.nama }}</h4>
                <p>{{ el.keterangan }}</p>
              </div>
              <v-spacer></v-spacer>
              <div class="d-flex align-center">
                <p class="custom__price mb-0">{{ el.nominal }}</p>
                <v-btn
                  @click="handlePunishment(el.nominal, el.nama)"
                  color="#206CFF"
                  style="margin-right: 1rem"
                  elevation="0"
                  icon
                >
                  <v-icon color="#206CFF">{{
                    icons.mdiSquareEditOutline
                  }}</v-icon>
                </v-btn>
              </div>
            </div>
            <div class="faktur__divider-dots"></div>
            <div class="faktur__subtotal custom__tanggungan-subtotal d-flex">
              <h3>Tanggungan Dibayar</h3>
              <v-spacer></v-spacer>
              <p>(-) Rp.0</p>
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
            <p>Rp 0</p>
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
            to="/detail-pembayaran"
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
    ></base-dialog>
    <base-dialog
      ref="baseDialogDenda"
      mode="denda"
      title="Bayar Tanggungan / Denda"
    ></base-dialog>
  </div>
</template>

<script>
import baseDialog from "@/components/base/BaseDialog.vue";
import { ref, onMounted } from "@vue/composition-api";
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
    const dataArr = ref([]);
    // Data dummies
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
    const namaKomisiVal = ref(null);
    const dendaVal = ref(null);
    const jumlahTerlambat = ref(null);

    // ————————————————————————————————————
    //* ——— HOOKS
    // ————————————————————————————————————
    onMounted(() => {
      fetchSalary();
    });

    // ————————————————————————————————————
    //* ——— Functions
    // ————————————————————————————————————
    const handleDialog = (key, nominal, totalPeriode, totalKehadiran) => {
      switch (key) {
        case "periode":
          baseDialogGapok.value.isVisible = true;
          baseDialogGapok.value.gajiPokok = nominal;
          baseDialogGapok.value.periode = totalPeriode;

          break;
        case "kehadiran":
          baseDialogLembur.value.isVisible = true;
          baseDialogLembur.value.gajiLembur = nominal;
          baseDialogLembur.value.kehadiran = totalKehadiran;
          break;
        default:
          break;
      }
    };
    const handleComission = (amount, name) => {
      baseDialogKomisi.value.isVisible = true;
      baseDialogKomisi.value.namaKomisiVal = name;
      baseDialogKomisi.value.komisiVal = amount;
    };
    const handlePunishment = (amount, name) => {
      baseDialogDenda.value.isVisible = true;
      baseDialogDenda.value.dendaVal = amount;
      baseDialogDenda.value.namaTanggungan = name;
    };

    const sumField = (key) => {
      // unfixed
      return dataArr.value.pengaturan_upah.reduce(
        (total, nominal) => Number(total) + Number(nominal[key] || 0),
        0
      );
    };

    const handleEditKeterlambatan = (keterlambatan) => {
      baseDialogKeterlambatan.value.jumlahTerlambat = keterlambatan;
      baseDialogKeterlambatan.value.isVisible = true;
    };

    const fetchSalary = async () => {
      fetch("https://boss.smartlink.id/salary/inquiry")
        .then((response) => response.json())
        .then((result) => (dataArr.value = result.data))
        .catch((error) => console.log("error", error));
    };

    return {
      // Template Ref
      gajiArr,
      aktifitasArr,
      komisiArr,
      tanggunganArr,
      komisiVal,
      namaKomisiVal,
      dendaVal,
      dataArr,
      jumlahTerlambat,

      // BaseDialog
      baseDialogKeterlambatan,
      baseDialogGapok,
      baseDialogLembur,
      baseDialogKomisi,
      baseDialogDenda,

      // icons
      mdiSquareEditOutline,
      mdiPlus,
      icons: {
        mdiCancel,
        mdiSquareEditOutline,
      },

      //Functions
      handleDialog,
      handleComission,
      handlePunishment,
      fetchSalary,
      sumField,
      handleEditKeterlambatan,
    };
  },
};
</script>

<style lang="scss">
</style>
