import moment from 'moment'
import 'moment/locale/id'
import Vue from 'vue'

Vue.filter('date', function (value) {
  if (!value) return ''
  return moment(value).format('ddd, D MMM YYYY', 'id')
})

Vue.filter('dateFull', function (value) {
  if (!value) return ''
  return moment(value).format('DD MMMM YYYY', 'id')
})

Vue.filter('time', function (value) {
  if (!value) return ''
  return moment(value).format('HH:mm', 'id')
})

Vue.filter('datetime', function (value) {
  if (!value) return ''
  return moment(value).format('D MMM, YYYY HH:mm', 'id')
})

Vue.filter('datetimeFull', function (value) {
  if (!value) return ''
  return moment(value).format('D MMMM YYYY HH:mm', 'id')
})

Vue.filter('day', function (value) {
  if (!value) return ''
  return moment(value).format('ddd', 'id')
})

Vue.filter('month', function (value) {
  if (!value) return ''
  return moment(value).format('MMMM', 'id')
})

Vue.filter('year', function (value) {
  if (!value) return ''
  return moment(value).format('YYYY', 'id')
})

Vue.filter('mounthYear', function (value) {
  if (!value) return ''
  return moment(value).format('MMMM YYYY', 'id')
})

Vue.filter('mounthYearArray', function (value) {
  if (!value || !Array.isArray(value) || value.length === 0) return ''

  if (value.length === 1) {
    return moment(value[0]).format('MMMM YYYY', 'id')
  } else if (value.length === 2) {
    return moment(value[0]).format('MMMM YYYY', 'id') + ' - ' + moment(value[1]).format('MMMM YYYY', 'id')
  }

  return ''
})

Vue.filter('millis', function (value) {
  let sec = Math.floor(value / 1000)
  let hrs = Math.floor(sec / 3600)
  sec -= hrs * 3600
  let min = Math.floor(sec / 60)
  sec -= min * 60

  sec = '' + sec
  sec = ('00' + sec).substring(sec.length)
  if (hrs > 0) {
    min = '' + min
    min = ('00' + min).substring(min.length)
    if (min > 0 && sec > 0) {
      return hrs + ' jam ' + min + ' menit ' + sec + ' detik '
    } else if (min > 0 && sec < 1) {
      return hrs + ' jam ' + min + ' menit '
    } else if (min < 1 && sec < 1) {
      return hrs + ' jam '
    }
  } else if (min > 0) {
    if (sec > 0) {
      return min + ' menit ' + sec + ' detik '
    } else {
      return min + ' menit '
    }
  } else {
    return sec + ' detik '
  }
})

Vue.filter('percent', num => {
  if (isNaN(num)) return 'Not a Number'
  let price = ''
  const reverseNumber = num.toString().split('').reverse().join('')
  const arrReverseNumber = [...Array(reverseNumber.length).keys()]
  arrReverseNumber.map(index => {
    if (index % 3 === 0) price += reverseNumber.substr(index, 3) + '.'
  })

  return `${price
    .split('', price.length - 1)
    .reverse()
    .join('')} %`
})

Vue.filter('num_format', (number = 0, decimals = 0, decPoint = ',', thousandsSep = '.') => {
  number = (number + '').replace(/[^0-9+\-Ee.]/g, '')
  let n = !isFinite(+number) ? 0 : +number
  let prec = !isFinite(+decimals) ? 0 : Math.abs(decimals)
  let sep = typeof thousandsSep === 'undefined' ? ',' : thousandsSep
  let dec = typeof decPoint === 'undefined' ? '.' : decPoint
  let s = ''

  let toFixedFix = function (n, prec) {
    let k = Math.pow(10, prec)
    return '' + (Math.round(n * k) / k).toFixed(prec)
  }

  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.')
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep)
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || ''
    s[1] += new Array(prec - s[1].length + 1).join('0')
  }
  return s.join(dec)
})

Vue.filter('price', (number = 0, decimals = 0, decPoint = ',', thousandsSep = '.') => {
  number = (number + '').replace(/[^0-9+\-Ee.]/g, '')
  let n = !isFinite(+number) ? 0 : +number
  let prec = !isFinite(+decimals) ? 0 : Math.abs(decimals)
  let sep = typeof thousandsSep === 'undefined' ? ',' : thousandsSep
  let dec = typeof decPoint === 'undefined' ? '.' : decPoint
  let s = ''

  let toFixedFix = function (n, prec) {
    let k = Math.pow(10, prec)
    return '' + (Math.round(n * k) / k).toFixed(prec)
  }

  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.')
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep)
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || ''
    s[1] += new Array(prec - s[1].length + 1).join('0')
  }
  return `Rp ${s.join(dec)}`
})

Vue.filter('account_number', value => {
  let v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
  let matches = v.match(/\d{4,16}/g)
  let match = (matches && matches[0]) || ''
  let parts = []

  for (let i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4))
  }

  if (parts.length) {
    return parts.join(' - ')
  } else {
    return value
  }
})

Vue.filter('phone_number', value => {
  let v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
  let matches = v.match(/\d{4,16}/g)
  let match = (matches && matches[0]) || ''
  let parts = []

  for (let i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4))
  }

  if (parts.length) {
    return parts.join('-')
  } else {
    return value
  }
})

Vue.filter('pricing', num => {
  if (isNaN(num)) return 'Not a Number'
  let price = ''
  const reverseNumber = num.toString().split('').reverse().join('')
  const arrReverseNumber = [...Array(reverseNumber.length).keys()]
  arrReverseNumber.map(index => {
    if (index % 3 === 0) price += reverseNumber.substr(index, 3) + '.'
  })

  return `${price
    .split('', price.length - 1)
    .reverse()
    .join('')}`
})

Vue.filter('phone', function (value) {
  if (!value) return ''
  return value.substring(0, 4) + ' - XXXX - XXXX'
})

Vue.filter('email', function (value) {
  if (!value) return ''
  return value.substring(0, 5) + '@XXXXX'
})

Vue.filter('address', function (value) {
  if (!value) return ''
  return value.substring(0, 10) + ' . . .'
})

Vue.filter('title', function (value) {
  if (!value) return ''
  if (value.length > 70) {
    return value.substring(0, 70) + ' . . .'
  } else {
    return value
  }
})

//custom value
Vue.filter('str_limit', function (value, size) {
  if (!value) return ''
  value = value.toString()

  if (value.length <= size) {
    return value
  }
  return value.substr(0, size) + ' . . .'
})

Vue.filter('desc', function (value) {
  if (!value) return ''
  if (value.length > 150) {
    return value.substring(0, 150) + ' . . .'
  } else {
    return value
  }
})

Vue.filter('emptyData', function (value) {
  if (value == '') {
    return '-'
  }
  return value
})

Vue.filter('initial', function (value) {
  if (!value) return ''
  let splitName = value.split(' ')
  let initial = value.charAt(0)
  if (splitName[1] !== undefined) {
    initial += splitName[1].charAt(0)
  }

  return initial.toUpperCase()
})

Vue.filter('num_format', (number = 0, decimals = 0, decPoint = ',', thousandsSep = '.') => {
  number = (number + '').replace(/[^0-9+\-Ee.]/g, '')
  let n = !isFinite(+number) ? 0 : +number
  let prec = !isFinite(+decimals) ? 0 : Math.abs(decimals)
  let sep = typeof thousandsSep === 'undefined' ? ',' : thousandsSep
  let dec = typeof decPoint === 'undefined' ? '.' : decPoint
  let s = ''

  let toFixedFix = function (n, prec) {
    let k = Math.pow(10, prec)
    return '' + (Math.round(n * k) / k).toFixed(prec)
  }

  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.')
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep)
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || ''
    s[1] += new Array(prec - s[1].length + 1).join('0')
  }
  return s.join(dec)
})

Vue.filter('isPng', urlImage => {
  let fileName = urlImage.substring(urlImage.lastIndexOf('.') + 1, urlImage.length) || urlImage
  if (fileName == 'png') {
    return true
  } else {
    return false
  }
})

Vue.filter('nik', value => {
  //split string
  const valueSplit = value.match(/.{1,2}/g)
  if (valueSplit) {
    if (valueSplit.length == 4) {
      const combinedIndex2Index3 = valueSplit[2] + valueSplit[3]
      valueSplit.splice(2, 2)
      valueSplit[2] = combinedIndex2Index3
    } else if (valueSplit.length > 4) {
      return value
    }

    return valueSplit.join('.')
  }

  return value
})

Vue.filter('logKey', value => {
  value = value.replaceAll('_', ' ')

  return value
})

export default {
  moment,
}
