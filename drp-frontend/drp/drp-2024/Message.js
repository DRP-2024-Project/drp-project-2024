import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { MaterialIcons } from 'react-native-vector-icons'
import { REMOTE_HOST } from './Config.js';
import AttendanceDetails from './AttendanceDetails.js';

const Message = ({ user, event }) => {
    const data = {
      eventId: event.id,
      user: user,
    };

    const [accepted, setAccepted] = useState(null);
    const handleAccept = async () => {
        let val;
        if (accepted) {
            val = null;
            data.attend = null;
        } else {
            val = true;
            data.attend = true;
        }
        await fetch(`${REMOTE_HOST}/attend`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        setAccepted(val);
    };

    const handleDecline = async () => {
        let val;
        if (accepted === false) {
            val = null
            data.attend = null;
        } else {
            val = false;
            data.attend = false;
        }
        await fetch(`${REMOTE_HOST}/attend`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        setAccepted(val);
    };

    const [ attendance, setAttendance ] = useState(null);
    const [ loading, setLoading ] = useState(true);
    const [ attendingText, setAttendingText ] = useState("Attending: ")
    const [ notAttendingText, setNotAttendingText ] = useState("Not Attending: ")
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`${REMOTE_HOST}/attending/?eventId=${event.id}`);
          const json = await response.json();
          if (json.attending.some(userObj => userObj.username == user)) {
            setAccepted(true);
          }
          if (json.notAttending.some(userObj => userObj.username == user)) {
            setAccepted(false);
          }
          setAttendance(json);
          setAttendingText(`Attending: ${json.attending.length}`)
          setNotAttendingText(`Not attending: ${json.notAttending.length}`)
        } catch (error) {
          console.error('Failed to fetch attending members:', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();

      const intervalId = setInterval(fetchData, 2000);
      return () => clearInterval(intervalId);

    }, [accepted]);

    const date = new Date(Number(event.timestamp));
    const stamp = date.toLocaleDateString('en-GB') + "  " + date.toLocaleTimeString('en-GB', {hour12:false}).slice(0,5)
    
    return (
        <View style={styles.container}>
          <Text style={styles.name}>{event.creator_name}</Text>
          <Text style={styles.description}>{event.description}</Text>
          <View style={styles.contentContainer}>
            <Text style={styles.dateText}>{event.date}, {event.time}</Text>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity style={[
                styles.attendButton, 
                {backgroundColor: accepted === true ? 'green' : '#F0F4F8'}
              ]}
              onPress={handleAccept}
            >
                <MaterialIcons name="check-circle" size={24} color="#d9dbda" />
                <Text style={styles.buttonText}>Attend</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[
                styles.notAttendButton,
                {backgroundColor: accepted === null || accepted ? '#F0F4F8' : 'red'}
                ]}
                onPress={handleDecline}
              >
                <MaterialIcons name="cancel" size={24} color="#d9dbda" />
                <Text style={styles.buttonText}>Not Attend</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.statusContainer}>
              <Text style={styles.statusText}>{attendingText}</Text>
              <Text style={styles.statusText}>{notAttendingText}</Text>
            </View>
            {loading ? (
                <ActivityIndicator size="large" color="#4A90E2" style={styles.loader} />
            ) : (
              <View style={styles.attendanceDetailsContainer}>
                <AttendanceDetails members={attendance.attending} title="Attending"/>
                <AttendanceDetails members={attendance.notAttending} title="Not Attending"/>
              </View>
            )}
          </View>
          <Text style={styles.timestamp}>{stamp}</Text>
        </View>
      );
    };

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#E3EAF4',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    margin: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  attendButton: {
    flexDirection: 'row',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
    alignItems: 'center',
    borderColor: '#ddd',
    borderWidth: 2,
  },
  notAttendButton: {
    flexDirection: 'row',
    backgroundColor: '#F0F4F8',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
    alignItems: 'center',
    borderColor: '#ddd',
    borderWidth: 2,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    marginLeft: 20,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  statusText: {
    fontSize: 16,
  },
  viewButton: {
    backgroundColor: '#F0F4F8',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 30,
    borderColor: '#ddd',
    borderWidth: 2,
  },
  viewButtonText: {
    color: 'black',
    fontSize: 16,
  },
  timestampContainer: {
    alignItems: 'flex-end',
  },
  timestamp: {
    position: 'absolute',
    bottom: 0,
    right: 10,
    fontSize: 12,
    color: '#999',
  },
  dateContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
  },
  dateText: {
    fontSize: 16,
    color: 'black',
  },
  attendanceDetailsContainer: {
    flexDirection: 'row', // Align components side by side
    justifyContent: 'space-between', // Evenly space components
    paddingHorizontal: 20, // Add horizontal padding to space from the edges
    marginTop: 20, // Add margin from the content above
  },
});

export default Message;