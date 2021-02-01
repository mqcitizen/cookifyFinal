import React, {Component} from 'react';
import {
  View,
  ToastAndroid,
  TextInput as BorderTextInput,
  Text,
  StyleSheet,
  Dimensions,
  Measure,
  Keyboard,
  FlatList,
  TouchableWithoutFeedback,
  ViewPropTypes,
} from 'react-native';
import PropTypes from 'prop-types';
import constants from '../../configurations/constants';
import Icon from 'react-native-vector-icons/Ionicons';
import _ from 'lodash';
import {NativeModulesCall} from '../../services/helperFunctions';

//Created By: Ashish Ranjan
//Uses: autocomplete text view component for react native
//Props: Go to AutoComplete.propTypes for props

class AutoComplete extends Component {
  constructor(props) {
    super(props);
    this.onChangeTextDelayed = _.debounce(this.displaySuggestion, 500);
    this.state = {
      selectedId: null,
      selectedValue: null,
      dataSource: [],
    };
    this.sugestionsListPos = {};
    this.elementHeight = null;
    this.elementPosition = null;
    this.primaryString = null;
    this.store = [];
    this.keyboardPos = Dimensions.get('screen').height;
    this.showSuggestions = false;
    this.measure = false;
  }

  // register events on keyboardDidShow and keyboardDidHide

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow.bind(this),
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide.bind(this),
    );
  }

  // deregister events on keyboardDidShow and keyboardDidHide

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  //when keyboard appears disbale scroll of parent component and pass it to the autocomplete component
  _keyboardDidShow(e) {
    this.keyboardPos = e.endCoordinates.screenY;
    this.showSuggestions = true;
    this.props.parentEndScroll();
  }

  //when keyboard hides disable scroll of autocomplete and pass it back to parent component
  _keyboardDidHide() {
    this.measure = false;
    this.keyboardPos = Dimensions.get('screen').height;
    this.showSuggestions = false;
    this.props.parentStartScroll();
  }

  //triggers at minimum of two characters
  //if the previous text was substring of new text filter from the previous list else filter from main list
  getDataLogic = (str) => {
    if (str.length > 2) {
      let dataSource = [];
      if (
        str
          .toLowerCase()
          .indexOf(
            this.primaryString != null
              ? this.primaryString.toLowerCase()
              : null,
          ) >= 0
      ) {
        dataSource = this.store.filter((itm) =>
          new RegExp(str.toLowerCase()).test(
            itm.MakeModelVersionName.toLowerCase(),
          ),
        );
        this.setState({dataSource});
      } else {
        this.primaryString = str;
        let requiredData = this.props.data.filter((itm) =>
          new RegExp(str.toLowerCase()).test(
            itm.MakeModelVersionName.toLowerCase(),
          ),
        );
        this.store = requiredData;
        if (this.props.sorted) {
          dataSource = requiredData.sort((a, b) =>
            a[this.props.valueKey]
              .toLowerCase()
              .localeCompare(b[this.props.valueKey].toLowerCase()),
          );
        } else {
          dataSource = requiredData;
        }
        this.setState({dataSource});
      }
      if (!dataSource.length) {
        NativeModulesCall(ToastAndroid.show)(
          constants.variableString.NO_DATA_FOUND,
          ToastAndroid.SHORT,
        );
      }
    } else {
      this.primaryString = null;
      this.store = [];
      this.setState({dataSource: []});
    }
  };

  //on clicking of one of the suggestion
  onSuggestionSelect = (id, value) => {
    this.props.onSelect(id);
    this.setState({selectedId: id, selectedValue: value});
  };

  //on press of cross button reset
  onSuggestionDeselect = () => {
    this.primaryString = null;
    this.store = [];
    this.props.onSelect(null);
    this.setState({selectedId: null, selectedValue: null, dataSource: []});
  };

  //measure position of element and display suggestions
  displaySuggestion = (str) => {
    if (!this.measure) {
      this.measure = true;
      if (!this.myComponent) {
        return false;
      }
      this.myComponent.measure((fx, fy, width, height, px, py) => {
        this.elementHeight = height;
        this.elementPosition = py;
        let spaceAboveElement = this.elementPosition;
        let spaceBelowElement =
          this.keyboardPos - (this.elementPosition + this.elementHeight);
        this.sugestionsListPos = {
          top: this.elementHeight,
          maxHeight: spaceBelowElement - this.props.heightBottomThreshold,
        };
        if (
          spaceAboveElement - this.props.heightTopThreshold >
          spaceBelowElement - this.props.heightBottomThreshold
        ) {
          this.sugestionsListPos = {
            bottom: this.elementHeight,
            maxHeight: spaceAboveElement - this.props.heightTopThreshold,
          };
        }
        this.getDataLogic(str);
      });
    } else {
      this.getDataLogic(str);
    }
  };

  render() {
    return this.state.selectedValue ? (
      <View
        style={[styles.selectedValueArea, this.props.selectedValueAreaStyle]}>
        <Text style={[styles.selectedValue, this.props.textStyle]}>
          {this.state.selectedValue}
        </Text>
        <View style={styles.closeButtonArea}>
          <TouchableWithoutFeedback onPress={this.onSuggestionDeselect}>
            <Icon
              name="md-close-circle"
              style={[styles.icon, this.props.iconStyle]}
            />
          </TouchableWithoutFeedback>
        </View>
      </View>
    ) : (
      <View>
        <View
          ref={(element) => {
            this.myComponent = element;
          }}
          onLayout={() => {}}>
          <BorderTextInput
            placeholder={this.props.placeholder}
            height={constants.uiElement.singleLineInputHeight}
            onChangeText={this.onChangeTextDelayed}
            style={this.props.textStyle}
          />
        </View>
        {this.state.dataSource.length > 0 && this.showSuggestions ? (
          <View style={[styles.suggestionArea, this.sugestionsListPos]}>
            <FlatList
              keyboardShouldPersistTaps="always"
              data={this.state.dataSource}
              renderItem={(data) => {
                return (
                  <View>
                    <TouchableWithoutFeedback
                      onPress={() => {
                        this.onSuggestionSelect(
                          data.item[this.props.idKey],
                          data.item[this.props.valueKey],
                        );
                      }}>
                      <View
                        style={[
                          styles.suggestionElementView,
                          this.props.suggestionElementViewStyle,
                        ]}>
                        <Text
                          style={[
                            styles.suggestionItem,
                            this.props.suggestionItemStyle,
                          ]}
                          numberOfLines={1}>
                          {data.item[this.props.valueKey]}
                        </Text>
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                );
              }}
              keyExtractor={(data) =>
                data[this.props.idKey]
                  ? data[this.props.idKey].toString()
                  : null
              }
            />
          </View>
        ) : null}
      </View>
    );
  }
}

//default props
AutoComplete.defaultProps = {
  placeholder: '',
  data: [],
  heightTopThreshold: 50,
  heightBottomThreshold: 20,
  sorted: true,
};

//prop types validation
AutoComplete.propTypes = {
  selectedValueAreaStyle: PropTypes.oneOfType([
    PropTypes.object,
    ViewPropTypes.style,
  ]),
  placeholder: PropTypes.string, //placeholder string
  // If this component is used in any scrollView we need to block parent scroll when suggestions appear and re enable scroll when suggestion disappear
  parentEndScroll: PropTypes.func.isRequired,
  parentStartScroll: PropTypes.func.isRequired,
  //Array of objects to bind data
  data: PropTypes.PropTypes.arrayOf(PropTypes.object).isRequired,
  //Function to trigger on any option selection
  onSelect: PropTypes.func.isRequired,
  iconStyle: PropTypes.oneOfType([PropTypes.object, ViewPropTypes.style]),
  suggestionElementViewStyle: PropTypes.oneOfType([
    PropTypes.object,
    ViewPropTypes.style,
  ]),
  suggestionItemStyle: PropTypes.oneOfType([
    PropTypes.object,
    Text.propTypes.style,
  ]),
  //id and value key of data array
  idKey: PropTypes.string.isRequired,
  valueKey: PropTypes.string.isRequired,
  fontFamily: PropTypes.string,
  color: PropTypes.string,
  textStyle: PropTypes.oneOfType([PropTypes.object, Text.propTypes.style]),
  sorted: PropTypes.bool,
};

//default styles
const styles = StyleSheet.create({
  suggestionArea: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 9999,
    borderRadius: 2,
    shadowColor: constants.colorCode.BLACK,
    borderWidth: 1,
    borderColor: constants.colorCode.DARKWHITE,
    borderBottomWidth: 0,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 1.0,
    shadowRadius: 2,
    elevation: 15,
    backgroundColor: constants.colorCode.WHITE,
  },
  suggestionElementView: {
    backgroundColor: constants.colorCode.WHITE,
    paddingLeft: 7,
    paddingRight: 7,
    paddingTop: 14,
    paddingBottom: 14,
    width: '100%',
  },
  selectedValueArea: {
    flexDirection: 'row',
    paddingTop: 5,
    paddingBottom: 5,
  },
  closeButtonArea: {
    justifyContent: 'center',
    paddingLeft: 5,
  },
  icon: {
    color: constants.colorCode.GREY,
    fontSize: 18,
  },
  suggestionItem: {
    color: 'black',
  },
  selectedValue: {
    color: 'black',
    maxWidth: '95%',
  },
});

export default AutoComplete;
