import { Injectable } from '@nestjs/common';
const URL = 'http://localhost:3030/tracks/';
import { Track } from './track.interface';
@Injectable()
export class TrackService {
  async getTracks(): Promise<Track[]> {
    const res = await fetch(URL);
    const parsed = await res.json();
    return parsed;
  }

  async getTrackById(id: number): Promise<Track> {
    const res = await fetch(URL + id);
    const parsed = await res.json();
    return parsed;
  }
}
