import React, { useState } from 'react'
import axios from 'axios'
import { API_URL, API_KEY } from '@env';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native'
import WeatherSearch from './src/components/WeatherSearch'
import WeatherInfo from './src/components/WeatherInfo'

const App = () => {
  const [weatherData, setWeatherData] = useState()
  const [status, setStatus] = useState('')

  const renderComponent = () => {
    switch (status) {
      case 'loading':
        return <ActivityIndicator size="large" />
      case 'success':
        return <WeatherInfo weatherData={weatherData} />
      case 'error':
        return (
          <Text style={styles.errorText}>
            Something went wrong. Please try again with a correct city name.
          </Text>
        )
      default:
        return
    }
  }

  const searchWeather = (location) => {
    setStatus('loading')
    axios
      .get(`${API_URL}?q=${location}&appid=${API_KEY}`)
      .then((response) => {
        const data = response.data
        // console.log(data)
        data.visibility /= 1000
        data.visibility = data.visibility.toFixed(2)
        data.main.temp = (data.main.temp - 273.15).toFixed(2)
        setWeatherData(data)
        setStatus('success')
      })
      .catch((error) => {
        // console.log(error)
        setStatus('error')
      })
  }

  return (
    <View style={styles.container}>
      <WeatherSearch searchWeather={searchWeather}/>
      <View style={styles.margintTop20}>{renderComponent()}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  errorText: {
    color: '#C60000',
    fontSize: 16,
    marginTop: 10,
  },
})

export default App