import {
  HttpCode,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Track } from './track.interface';
const BASE_URL = 'http://localhost:3030/tracks/';
@Injectable()
export class TrackService {
  async getTracks(): Promise<Track[]> {
    const res = await fetch(BASE_URL);
    const parsed = await res.json();
    return parsed;
  }

  async getTrackById(id: number): Promise<Track> {
    const res = await fetch(BASE_URL + id);
    const parsed = await res.json();
    //track existe: lo retornamos al controller
    if (Object.keys(parsed).length) return parsed;
    //track no existe: lanzamos una excepción al controller
    throw new NotFoundException(`Track con id ${id} no existe`);
  }

  async createTrack(track: Track) {
    const id = await this.setId();
    const newTrack = { ...track, id };
    await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTrack),
    });
  }

  async deleteTrackById(id: number): Promise<any> {
    const res = await fetch(BASE_URL + id, {
      method: 'DELETE',
    });
    const parsed = await res.json();
    return parsed;
  }

  async updateTrackById(id: number, body: Track): Promise<void> {
    const isTrack = await this.getTrackById(id);
    if (!Object.keys(isTrack).length) return; //early return
    const updatedTrack = { ...body, id };
    await fetch(BASE_URL + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTrack),
    });
  }

  private async setId(): Promise<number> {
    const tracks = await this.getTracks();
    const id = tracks.pop().id + 1;
    return id;
  }
}
