import { render, waitFor } from '../../utils/test-utils';

import Test from './Test';

describe('Test Component', () => {
  it('рендерится без сбоев', () => {
    render(<Test />);
  });

  it('отображает заголовок', async () => {
    const { getByText } = render(<Test />);

    await waitFor(() => getByText('Тестирование'));
  });
});
