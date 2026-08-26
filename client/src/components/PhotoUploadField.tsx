import { useRef, useState } from 'react';
import { PhotoAttachment } from '../types';
import { useLanguage } from '../context/LanguageContext';

const MAX_PHOTOS = 3;
const MAX_SIZE = 2 * 1024 * 1024;
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/jpg'];

interface PhotoUploadFieldProps {
  photos: PhotoAttachment[];
  onChange: (photos: PhotoAttachment[]) => void;
  error?: string;
}

function readFileAsBase64(file: File): Promise<PhotoAttachment> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.split(',')[1] ?? '';
      resolve({ name: file.name, type: file.type, data: base64 });
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

export default function PhotoUploadField({ photos, onChange, error }: PhotoUploadFieldProps) {
  const { f } = useLanguage();
  const inputRef = useRef<HTMLInputElement>(null);
  const [localError, setLocalError] = useState('');

  const handleFiles = async (fileList: FileList | null) => {
    if (!fileList?.length) return;
    setLocalError('');

    const next = [...photos];
    for (const file of Array.from(fileList)) {
      if (next.length >= MAX_PHOTOS) {
        setLocalError(f.photos.tooMany);
        break;
      }
      if (!ALLOWED_TYPES.includes(file.type)) {
        setLocalError(f.photos.invalidType);
        continue;
      }
      if (file.size > MAX_SIZE) {
        setLocalError(f.photos.tooLarge);
        continue;
      }
      const attachment = await readFileAsBase64(file);
      next.push(attachment);
    }
    onChange(next);
  };

  const removePhoto = (index: number) => {
    onChange(photos.filter((_, i) => i !== index));
  };

  return (
    <div className="form-group photo-upload-field">
      <label htmlFor="photo-upload">{f.photos.label}</label>
      <p className="field-hint">{f.photos.hint}</p>
      <input
        ref={inputRef}
        id="photo-upload"
        type="file"
        accept="image/jpeg,image/png"
        multiple
        onChange={(e) => {
          handleFiles(e.target.files);
          e.target.value = '';
        }}
      />
      {photos.length > 0 && (
        <ul className="photo-preview-list">
          {photos.map((photo, index) => (
            <li key={`${photo.name}-${index}`}>
              <span>{photo.name}</span>
              <button type="button" onClick={() => removePhoto(index)}>
                {f.photos.remove}
              </button>
            </li>
          ))}
        </ul>
      )}
      {(error || localError) && <p className="field-error">{error || localError}</p>}
    </div>
  );
}
