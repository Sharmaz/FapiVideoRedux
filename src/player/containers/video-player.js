import React, { Component } from 'react';
import VideoPlayerLayout from '../components/video-player-layout';
import Video from './video';
import Title from '../components/title';
import PlayPause from '../components/play-pause';
import Timer from '../components/timer';
import Controls from '../components/video-player-controls';
import formattedTime from '../../libs/utilities';
import ProgressBar from '../components/progress-bar';
import Spinner from '../components/spinner';
import Volume from '../components/volume';
import FullScreen from '../components/full-screen';
import { connect } from 'react-redux';

class VideoPlayer extends Component {
  state = {
    pause: true,
    duration: 0,
    currentTime: 0,
    durationFloat: 0,
    currentTimeFloat: 0,
    loading: false,
    lastVolume: null,
    volume: 1,
  }
  togglePlay = (event) => {
    this.setState({
      pause: !this.state.pause,
    })
  }
  componentDidMount() {
    this.setState({
      pause: (!this.props.autoplay)
    })
  }
  handleLoadedMetadata = (event) => {
    this.video = event.target;
    this.setState({
      duration: this.video.duration,
      durationFloat: formattedTime(this.video.duration),
    });
  }
  handleTimeUpdate = (event) => {
    this.setState({
      currentTime: this.video.currentTime,
      currentTimeFloat: formattedTime(this.video.currentTime),
    })
  }
  handleProgressChange = (event) => {
    this.video.currentTime = event.target.value;
  }
  handleSeeking = (event) => {
    this.setState({
      loading: true,
    })
  }
  handleSeeked = (event) => {
    this.setState({
      loading: false,
    })
  }
  handleVolumeChange = (event) => {
    this.video.volume = event.target.value;
    this.setState({
      volume: this.video.volume,
    })
  }
  handleVolumeClick = (event) => {
    this.setState({
      lastVolume: this.video.volume,
      volume: (this.state.volume !== 0) ? 0 : this.state.lastVolume,
    })
    
    this.video.volume = this.state.lastVolume;
  }
  handleFullScreenClick = (event) => {

    if (document.mozFullScreen) {
      document.mozCancelFullScreen();
    }
    else if (document.webkitIsFullScreen) {
      document.webkitExitFullscreen();
    }
    else if (this.player.mozRequestFullScreen) {
      this.player.mozRequestFullScreen();
    }
    else if (this.player.webkitRequestFullscreen) {
      this.player.webkitRequestFullscreen(); 
    }

  }
  setRef = (element) => {
    this.player = element;
  }
  render() {
    return (
      <VideoPlayerLayout
        setRef={this.setRef}
      >
        <Title
          title={this.props.media.get('title')}
        />
        <Controls>
          <PlayPause
            pause={this.state.pause}
            handleClick={this.togglePlay}
          />
          <Timer 
            duration={this.state.durationFloat}
            currentTime={this.state.currentTimeFloat}
          />
          <ProgressBar
            duration={this.state.duration}
            value={this.state.currentTime}
            handleProgressChange={this.handleProgressChange}
          />
          <Volume
            handleVolumeChange={this.handleVolumeChange}
            handleVolumeClick={this.handleVolumeClick}
            value={this.state.volume}
          />
          <FullScreen 
            handleFullScreenClick={this.handleFullScreenClick}
          />
        </Controls>
        <Spinner
          active={this.state.loading}
        />
        <Video
          autoplay={this.props.autoplay}
          pause={this.state.pause}
          handleLoadedMetadata={this.handleLoadedMetadata}
          handleTimeUpdate={this.handleTimeUpdate}
          handleSeeking={this.handleSeeking}
          handleSeeked={this.handleSeeked}
          src={this.props.media.get('src')}
        />
      </VideoPlayerLayout>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    media: state.get('data').get('entities').get('media').get(props.id),
  }
}

export default connect(mapStateToProps)(VideoPlayer);
