# simpliest-react-timer

Basically, this hook expects as an argument expiryDate to start with, and returns timeLeft object.

Usage: 

  const timeLeft = useTimer({
    expiryDate: new Date('some date in future'),
  });

All the UI implementation rests on you.