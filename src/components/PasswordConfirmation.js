import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Password from './Password';

const PasswordConfirmation = ({ onChange }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (password !== '' && confirmPassword !== '' && password !== confirmPassword) {
      setError('Passwords do not match');
    } else {
      setError('');
      onChange && onChange(password);
    }
  }, [password, confirmPassword]);

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleConfirmPasswordChange = (text) => {
    setConfirmPassword(text);
  };

  return (
    <View>
      <Password
        placeholder="Create password"
        value={password}
        onChangeText={handlePasswordChange}
      />
      <Password
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={handleConfirmPasswordChange}
      />
      {error !== '' && (
        <Text style={styles.errorText}>{error}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    marginTop: 5,
  },
});

export default PasswordConfirmation;
