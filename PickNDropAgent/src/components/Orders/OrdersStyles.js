import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    display: 'flex',
  },
  scrollView: {
    marginHorizontal: 15,
  },
  book: {
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 30,
    fontWeight: 'bold',
    fontSize: 25,
    justifyContent: 'center',
    color: 'tomato',
  },
  loadContainer: {
    marginTop: 250,
    marginBottom: 20,
    justifyContent:'center',
    alignItems:'center'
  },
  btn: {
    marginTop: 10,
    width: 150,
    backgroundColor: 'tomato',
  },
  btn2: {
    width: 150,
    backgroundColor: 'aqua',
    marginTop: 10,
    marginBottom: 30,
  },
  txtBtn: {
    color: 'aqua',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  txtBtn2: {
    color: 'tomato',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  txt: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 10,
  },
  statYellow: {
    backgroundColor: 'yellow',
    fontWeight: 'bold',
  },
  statGreen: {
    backgroundColor: 'green',
    color: 'white',
    fontWeight: 'bold',
  },
  name: {
    fontStyle: 'italic',
    fontSize: 25,
  },
  card: {
    height: 250,
    width: 250,
    marginLeft: 10,
    marginRight: 10,
  },
  date: {
    marginLeft: 20,
    fontSize: 18,
    fontWeight: '500',
    color: 'tomato',
    marginTop:15,
    fontStyle: 'italic'
  },
});

export default styles;
